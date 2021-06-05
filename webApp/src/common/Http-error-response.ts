import {HttpErrorResponse as NgHttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ErrorMessage} from './error-message';

/**
 * 自定义http错误响应
 */
export class HttpErrorResponse extends NgHttpErrorResponse {
  /**
   * 将angular自带的HttpErrorResponse中的error类型重写为ErrorMessage
   */
  readonly error: ErrorMessage | undefined;

  constructor(init: { error?: ErrorMessage; headers?: HttpHeaders; status?: number; statusText?: string; url?: string }) {
    super(init);
    this.error = init.error;
  }
}
