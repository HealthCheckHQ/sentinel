import { QueueItem } from '@/dtos/queueItem.dto';
import { BaseAdapter } from './baseAdapter';
import { convert } from 'json-to-line-protocol';
import * as zlib from 'zlib';
import axios from 'axios';
import { GrafanaCloudPrometheusConfig } from '@/dtos/adapterConfigs/grafanaCloudPrometheus.config';
import { validateObject } from '@/utils/classValidator';

// TODO: Incomplete. TBD later
export class GrafanaCloudPrometheusAdapter extends BaseAdapter {
  config: GrafanaCloudPrometheusConfig;
  constructor(config: GrafanaCloudPrometheusConfig) {
    super();
    this.config = config;
  }

  private async sendMetricPoints(
    dataArray: { measurement: string; tags: Record<string, string>; fields: Record<string, string> }[],
    enableZipping: boolean,
  ) {
    const metricsArray = [];
    dataArray.forEach(body => {
      const str = convert(body);
      metricsArray.push(str);
    });

    let finalBodyString: any = metricsArray.join('\n');

    const headers = {
      Authorization: `Bearer ${this.config.instanceId}:${this.config.token}`,
    };
    if (enableZipping) {
      finalBodyString = zlib.gzipSync(Buffer.from(finalBodyString, 'utf8'));
      headers['Content-Encoding'] = 'gzip';
    }

    const response = await axios.post(`${this.config.baseUrl}/api/v1/push/influx/write`, finalBodyString, {
      headers,
    });

    return response;
  }
  public async validateConfig(): Promise<void> {
    await validateObject(GrafanaCloudPrometheusConfig, this.config);
  }
  public exportEvents(queueItem: QueueItem): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public flushData(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public shutdown(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
