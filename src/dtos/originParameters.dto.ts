import { AuthenticationType } from '@/enums/authenticationType.enum';
import { RequestType } from '@/enums/requestType.enum';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class OriginConfiguration {
  @IsEnum(RequestType)
  public requestType: RequestType;

  @IsUrl()
  public url: string;

  @IsEnum(AuthenticationType)
  public authentication: AuthenticationType;

  @IsNumber()
  @Min(1000)
  @Max(60000)
  public timeout: number;

  @IsOptional()
  @IsObject()
  public queryParams?: Record<string, string>;

  @IsOptional()
  @IsObject()
  public headers?: Record<string, string>;

  @IsBoolean()
  public followRedirect: boolean;

  @IsOptional()
  public body?: object;

  @IsOptional()
  public token?: string;

  @IsOptional()
  public userName?: string;

  @IsOptional()
  public password?: string;
}

export class UpTimeConfiguration {
  @IsArray()
  @ArrayMinSize(1)
  validStatusCodes: Array<number>;
}

export class OriginParameters {
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => Map<string, string>)
  labels: Map<string, string>;

  @IsString()
  cronExpression: string;

  @IsObject()
  @Type(() => UpTimeConfiguration)
  uptimeConfiguration: UpTimeConfiguration;

  @IsObject()
  @Type(() => UpTimeConfiguration)
  originConfiguration: OriginConfiguration;
}
