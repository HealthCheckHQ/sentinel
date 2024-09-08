import { IsNotEmpty, IsString } from 'class-validator';

export class GrafanaCloudPrometheusConfig {
  @IsString()
  @IsNotEmpty()
  instanceId: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  baseUrl: string;
}
