import { ArrayMinSize, ArrayUnique, IsArray, IsEnum, IsNotEmptyObject, IsObject, IsString, IsUrl, ValidateNested } from 'class-validator';
import { OriginParameters } from './originParameters.dto';
import { Type } from 'class-transformer';
import { ExportType } from '@/enums/exportType.enum';

export class ExportParameters {
  @IsEnum(ExportType)
  type: ExportType;
  @IsObject()
  config: any;
}
export class SyntheticParameter {
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsUrl({ require_protocol: true, host_whitelist: ['localhost'] }, { each: true })
  url: string;

  @IsString()
  location: string;
}

export class SentinelParameters {
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @Type(() => SyntheticParameter)
  synthetics: SyntheticParameter[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OriginParameters)
  originParameters: OriginParameters[];

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExportParameters)
  export: ExportParameters;
}
