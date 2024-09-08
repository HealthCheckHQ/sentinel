import { config } from 'dotenv';
config({ path: `.env` });

export const SENTINEL_CONFIG = {
  sentinelAuthKey: process.env.API_KEY || 'SENTINEL_AUTH_KEY',
  sentinelAuthValue: process.env.API_KEY_VALUE || 'bd39004d-e21d-4a0b-ab93-eafa4d27de2e',
  configPath: process.env.SENTINEL_CONFIG_PATH,
};
