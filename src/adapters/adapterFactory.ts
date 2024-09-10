import { ExportType } from '@/enums/exportType.enum';
import { AzureEventsHubAdapter } from '@/adapters/azureEventshub.adapter';
import { BaseAdapter } from '@/adapters/baseAdapter';

export class AdapterFactory {
  async getAdapter(type: ExportType, config: any): Promise<BaseAdapter> {
    switch (type) {
      case ExportType.EVENTHUB:
        const eventHubAdapter = new AzureEventsHubAdapter(config);
        await eventHubAdapter.validateConfig();
        eventHubAdapter.initializeEventshub();
        return eventHubAdapter;

      default:
        throw Error(`Adapter Not found for type: ${type}`);
    }
  }
}
