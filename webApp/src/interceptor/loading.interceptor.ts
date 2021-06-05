import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import { CommonService } from '../service/common.service';

/**
 * 设置loading.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldIntercept(req)) {
      this.commonService.sendLoading(true);
      return next.handle(req).pipe(
        finalize(() => {
          this.commonService.sendLoading(false);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  /**
   * 当上传文件时不进行拦截.
   * @param request 请求
   */
  public shouldIntercept(request: HttpRequest<any>): boolean {
    return request.responseType !== 'blob';
  }

}
