import { sleep } from '@utils/sleep';
import { logger } from '@utils/logger';
import fs from 'fs';
import { SENTINEL_CONFIG } from './config';
import { validateObject } from '@utils/classValidator';
import { SentinelParameters, SyntheticParameter } from './dtos/sentinelParameters.dto';
import { syntheticHealthCheck } from './utils/syntheticHealthCheck';
import { OriginParameters } from './dtos/originParameters.dto';
import cron from 'node-cron';
import { syntheticProbeOrigin } from './utils/syntheticProbeOrigin';
import { QueueItem } from './dtos/queueItem.dto';
import fastq from 'fastq';
import type { queueAsPromised } from 'fastq';

async function queueConsumer(queueItem: QueueItem): Promise<void> {
  // No need for a try-catch block, fastq handles errors automatically
  console.log(queueItem);
}

const exportQueue: queueAsPromised<QueueItem> = fastq.promise(queueConsumer, 1);

async function scheduleProbes(originParameters: OriginParameters[], synthetics: SyntheticParameter[]) {
  originParameters.forEach(originParam => {
    logger.info(`Scheduling Cron for ${originParam.name} at ${originParam.cronExpression}`);
    cron.schedule(originParam.cronExpression, async () => {
      const promiseArr = [];
      synthetics.forEach(synthetic => {
        promiseArr.push(syntheticProbeOrigin(synthetic, originParam.originConfiguration));
      });
      const results = await Promise.allSettled(promiseArr);
      let i = 0;
      for (const result of results) {
        exportQueue.push(QueueItem.toQueueItem(result, synthetics[i], originParam));
        i++;
      }
    });
  });
}

async function checkIfSynetheticsAreUp(synthetics: SyntheticParameter[]) {
  await Promise.all(synthetics.map(origin => syntheticHealthCheck(origin.url)));
}

async function loadConfig() {
  const obj: SentinelParameters = JSON.parse(fs.readFileSync(SENTINEL_CONFIG.configPath, 'utf8'));
  await validateObject(SentinelParameters, obj);
  try {
    await checkIfSynetheticsAreUp(obj.synthetics);
    return obj;
  } catch (error) {
    throw Error(`Unable to start as few syntehtics are unhealthy: ${error.message}`);
  }
}

export async function main() {
  const obj: SentinelParameters = await loadConfig();
  await scheduleProbes(obj.originParameters, obj.synthetics);
}
