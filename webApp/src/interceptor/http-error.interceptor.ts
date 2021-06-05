import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import { CommonService } from '../service/common.service';
import { UserService } from '../service/user.service';

/**
 * HTTP请求错误拦截器.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService,
              private router: Router,
              private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpException(error);
      }));
  }

  /**
   * 处理异常
   * @param error 异常
   */
  private handleHttpException(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    switch (error.status) {
      case 401:
        if (!this.router.url.startsWith(`/login`)) {
          this.userService.setCurrentLoginUser(null);
          // 未登录，跳转到登录页
          this.router.navigateByUrl('/login').then();
        }
        break;
      case 400:
        this.commonService.error(() => {
        }, error.url, '非合理的请求参数');
        break;
      case 403:
        this.commonService.error(() => {
        }, error.url, '您无此操作权限');
        break;
      case 404:
        this.commonService.error(() => {
        }, error.url, '当前访问的地址不存在');
        break;
      case 405:
        this.commonService.error(() => {
        }, error.url, '当前请求方法不允许');
        break;
      case 500:
        this.commonService.error(() => {
          }, error.url + error.message,
          '发生逻辑错误');
        break;
      case 0:
        this.commonService.error(() => {
        }, error.url, '未知错误');
        break;
      default:
        break;
    }
    // 最终将异常抛出来，便于组件个性化处理
    return throwError(error);
  }
}
