import { SENTINEL_CONFIG } from '@/config';
import axios from 'axios';

export async function syntheticHealthCheck(origin: string) {
  const startTime = Date.now();
  try {
    const headers = { 'User-Agent': `HealthcheckHQ/sentinel` };
    headers[SENTINEL_CONFIG.sentinelAuthKey] = SENTINEL_CONFIG.sentinelAuthValue;
    const response = await axios({
      url: `${origin}/health`,
      method: 'get',
      headers,
      timeout: 5_000,
      maxRedirects: 0,
    });
    const endTime = Date.now();
    return {
      success: true,
      timeElapsed: endTime - startTime,
      successResponse: { statusCode: response.status, message: response.data },
    };
  } catch (error) {
    if (error.response) {
      throw Error(`ResponseCode ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      throw Error(`Request was initialzed but no response was received: ${error.message}`);
    } else {
      throw error;
    }
  }
}
