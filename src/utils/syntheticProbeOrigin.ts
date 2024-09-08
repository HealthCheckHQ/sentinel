import { SENTINEL_CONFIG } from '@/config';
import { ProbeResponse } from '@/dtos/checkOriginResponse.dto';
import { OriginConfiguration } from '@/dtos/originParameters.dto';
import { SyntheticParameter } from '@/dtos/sentinelParameters.dto';
import axios from 'axios';

export async function syntheticProbeOrigin(synthetic: SyntheticParameter, originConfiguration: OriginConfiguration): Promise<ProbeResponse> {
  const startTime = Date.now();
  try {
    const headers = { ...originConfiguration.headers };
    headers[SENTINEL_CONFIG.sentinelAuthKey] = SENTINEL_CONFIG.sentinelAuthValue;
    headers['Synthetic-Location'] = synthetic.location || 'default';
    const response = await axios({
      url: `${synthetic.url}/probe`,
      method: 'post',
      data: {
        requestType: originConfiguration.requestType,
        url: originConfiguration.url,
        authentication: originConfiguration.authentication,
        timeout: originConfiguration.timeout,
        followRedirect: originConfiguration.followRedirect,
        token: originConfiguration.token,
        headers,
        queryParams: originConfiguration.queryParams,
        body: originConfiguration.body,
        userName: originConfiguration.userName,
        password: originConfiguration.password,
      },
      headers,
      timeout: 120_000,
      maxRedirects: 0,
    });
    const endTime = Date.now();
    return {
      success: true,
      timeElapsed: endTime - startTime,
      statusCode: response.status,
      originResponse: response.data,
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
