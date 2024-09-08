import 'reflect-metadata';
import { main } from '@/main';
import { logger } from '@utils/logger';

main().catch(err => {
  logger.error('Process Exiting with err', err);
  process.exit(1);
});
