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
import { AdapterFactory } from '@/adapters/adapterFactory';
import { BaseAdapter } from '@/adapters/baseAdapter';
import { OsSignalHandler } from '@utils/osSignalHandler';

const adapterfactory = new AdapterFactory();
let adapter: BaseAdapter;
const cronSchedules: cron.ScheduledTask[] = [];

async function queueConsumer(queueItem: QueueItem): Promise<void> {
  // No need for a try-catch block, fastq handles errors automatically
  await adapter.exportEvents(queueItem);
}
const exportQueue: queueAsPromised<QueueItem> = fastq.promise(queueConsumer, 1);
const osSignalHandler = new OsSignalHandler(process);
osSignalHandler.registerSigtermHandler(async () => {
  for (const cronSchedule of cronSchedules) {
    cronSchedule.removeAllListeners();
    cronSchedule.stop();
  }
  await exportQueue.drained();
  await adapter.shutdown();
});

async function scheduleProbes(originParameters: OriginParameters[], synthetics: SyntheticParameter[]) {
  originParameters.forEach(originParam => {
    logger.info(`Scheduling Cron for ${originParam.name} at ${originParam.cronExpression}`);
    cronSchedules.push(
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
      }),
    );
  });
}

async function checkIfSynetheticsAreUp(synthetics: SyntheticParameter[]) {
  await Promise.all(synthetics.map(origin => syntheticHealthCheck(origin.url)));
}

async function loadConfig() {
  const obj: SentinelParameters = JSON.parse(fs.readFileSync(SENTINEL_CONFIG.configPath, 'utf8'));
  await validateObject(SentinelParameters, obj);
  return obj;
}
function createConfigFromJson(config: any) {
  const configFromEnv = {};
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'boolean') {
      configFromEnv[key] = value;
      continue;
    }
    if (!process.env[value as string]) {
      throw new Error(`Error Loading Export config. ${value} is not found in env`);
    }
    configFromEnv[key] = process.env[value as string];
  }
  return configFromEnv;
}

export async function main() {
  const obj: SentinelParameters = await loadConfig();
  try {
    await checkIfSynetheticsAreUp(obj.synthetics);
  } catch (error) {
    throw Error(`Unable to start as few syntehtics are unhealthy: ${error.message}`);
  }
  adapter = await adapterfactory.getAdapter(obj.export.type, createConfigFromJson(obj.export.config));
  await scheduleProbes(obj.originParameters, obj.synthetics);
}
