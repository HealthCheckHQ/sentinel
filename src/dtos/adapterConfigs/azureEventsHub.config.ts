import { TokenCredential } from '@azure/event-hubs';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AzureEventshubConfig {
  @IsString()
  @IsNotEmpty()
  eventHubNamespace: string;

  @IsString()
  @IsNotEmpty()
  eventHubName: string;

  @IsOptional()
  azureClientId: string;

  @IsOptional()
  @IsString()
  eventhubNamespaceConnectionString: string;

  @IsBoolean()
  @IsOptional()
  exportToPrometheusFormat: boolean;
}
