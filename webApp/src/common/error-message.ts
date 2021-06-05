/**
 * 错误消息
 */
export class ErrorMessage {
  message: string;

  constructor(data = {} as { message?: string }) {
    this.message = data.message as string;
  }
}
