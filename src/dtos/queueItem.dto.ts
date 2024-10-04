import { LogLevel } from '@/enums/logLevel.enum';
import { SyntheticParameter } from '@dtos/sentinelParameters.dto';
import { OriginParameters } from '@dtos/originParameters.dto';
import { ProbeResponse } from '@dtos/checkOriginResponse.dto';

export class QueueItem {
  level: LogLevel;
  target: string;
  name: string;
  synetheticUrl: string;
  location: string;
  message: string;
  duration: number;
  startTime: string;
  endTime: string;
  label: Map<string, string>;
  status: number;

  static toQueueItem(
    promiseResult: PromiseSettledResult<ProbeResponse>,
    synthetic: SyntheticParameter,
    originParameters: OriginParameters,
  ): QueueItem {
    const queueItem = new QueueItem();
    queueItem.name = originParameters.name;
    queueItem.target = originParameters.originConfiguration.url;
    queueItem.synetheticUrl = synthetic.url;
    queueItem.location = synthetic.location;
    queueItem.label = originParameters.labels;
    if (promiseResult.status === 'fulfilled') {
      queueItem.startTime = promiseResult.value.originResponse.startTime;
      queueItem.endTime = promiseResult.value.originResponse.endTime;
      queueItem.status = promiseResult.value.statusCode;
      queueItem.duration = promiseResult.value.originResponse.timeElapsed;
      if (
        promiseResult.value.success &&
        promiseResult.value.originResponse.successResponse &&
        originParameters.uptimeConfiguration.validStatusCodes.includes(promiseResult.value.originResponse?.successResponse?.statusCode)
      ) {
        queueItem.level = LogLevel.INFO;
        queueItem.message = promiseResult.value.originResponse.successResponse.body;
      } else {
        if (promiseResult.value.success && promiseResult.value.originResponse.successResponse) {
          queueItem.level = LogLevel.ERROR;
          queueItem.message = promiseResult.value.originResponse.successResponse.body;
        } else {
          queueItem.level = LogLevel.ERROR;
          queueItem.message = promiseResult.value.originResponse.failureResponse.errorMessage;
        }
      }
    }
    if (promiseResult.status === 'rejected') {
      queueItem.level = LogLevel.ERROR;
      queueItem.message = `Unable to connect to sentinel: ${promiseResult.reason}`;
      queueItem.duration = 0;
    }
    return queueItem;
  }
}
