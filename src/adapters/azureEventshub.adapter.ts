import { BaseAdapter } from '@/adapters/baseAdapter';
import { AzureEventshubConfig } from '@/dtos/adapterConfigs/azureEventsHub.config';
import { QueueItem } from '@/dtos/queueItem.dto';
import { validateObject } from '@/utils/classValidator';
import { EventHubProducerClient } from '@azure/event-hubs';
import { AzureCliCredential, ChainedTokenCredential, ManagedIdentityCredential } from '@azure/identity';

export class AzureEventsHubAdapter extends BaseAdapter {
  private config: AzureEventshubConfig;
  eventhubProducer: EventHubProducerClient;

  constructor(config: AzureEventshubConfig) {
    super();
    this.config = config;
  }
  public async validateConfig(): Promise<void> {
    await validateObject(AzureEventshubConfig, this.config);
  }
  public initializeEventshub() {
    const retryOptions = { retryOptions: { maxRetries: 5, retryDelayInMs: 60000, mode: 0 } };
    if (this.config.eventhubNamespaceConnectionString) {
      this.eventhubProducer = new EventHubProducerClient(this.config.eventhubNamespaceConnectionString, this.config.eventHubName, retryOptions);
    } else {
      const azureIdentityCredential = new ChainedTokenCredential(new ManagedIdentityCredential(this.config.azureClientId), new AzureCliCredential());
      this.eventhubProducer = new EventHubProducerClient(
        this.config.eventHubNamespace,
        this.config.eventHubName,
        azureIdentityCredential,
        retryOptions,
      );
    }
  }
  private async sendToEventsHub(body: any) {
    const batch = await this.eventhubProducer.createBatch();
    const isAdded = batch.tryAdd({ body, contentType: 'application/json' });
    if (isAdded) {
      await this.eventhubProducer.sendBatch(batch);
    }
    throw Error('Something went wrong while adding to batch');
  }
  public async exportEvents(queueItem: QueueItem): Promise<void> {
    if (!this.eventhubProducer) {
      throw new Error('Eventhub producer not initialized');
    }
    if (this.config.exportToPrometheusFormat) {
      return await this.exportEventsToPrometheusFormat(queueItem);
    } else {
      return await this.sendToEventsHub(queueItem);
    }
  }

  private async exportEventsToPrometheusFormat(queueItem: QueueItem): Promise<void> {
    const promMeasurement = {
      measurement: 'healthcheck',
      tags: {
        level: queueItem.level,
        target: queueItem.target,
        name: queueItem.name,
        syntheticUrl: queueItem.synetheticUrl,
        location: queueItem.location,
        message: JSON.stringify(queueItem.message),
        startTime: queueItem.startTime,
        endTime: queueItem.endTime,
        status: String(queueItem.status),
      },
      fields: { duration: `${queueItem.duration}` },
      ts: `${Date.now() * 1000000}`,
    };
    await this.sendToEventsHub(promMeasurement);
  }
  public shutdown(): Promise<void> {
    if (this.eventhubProducer) {
      this.eventhubProducer.close();
    }
    return;
  }
  public flushData(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
