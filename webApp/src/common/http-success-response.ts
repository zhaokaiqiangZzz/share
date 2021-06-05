/**
 * http请求成功响应信息
 */
export interface HttpSuccessResponse {
  code: number;
  message: string;
  data?: any;
}
