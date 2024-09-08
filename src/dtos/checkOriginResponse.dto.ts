export class CheckOriginResponse {
  success: boolean;
  timeElapsed: number;
  startTime: string;
  endTime: string;
  successResponse?: SuccessResponse;
  failureResponse?: FailureResponse;
}

export class SuccessResponse {
  statusCode: number;
  headers: any;
  body: any;
}

export class FailureResponse {
  errorMessage: string;
}

export class ProbeResponse {
  success: boolean;
  timeElapsed: number;
  originResponse: CheckOriginResponse;
  statusCode: number;
}
