import { ArrayMinSize, ArrayUnique, IsArray, IsString, IsUrl, ValidateNested } from 'class-validator';
import { OriginParameters } from './originParameters.dto';
import { Type } from 'class-transformer';

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
}
