import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { isNotNullOrUndefined } from '../common/utils';

/**
 * 过滤掉params中的null或undefined或空字符串
 */
export class NullOrUndefinedOrEmptyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * 过滤到null及undefined
     */
    let cleanedParams = new HttpParams();
    request.params.keys().forEach(x => {
      if (isNotNullOrUndefined(request.params.get(x)) && request.params.get(x).length > 0) {
        cleanedParams = cleanedParams.append(x, request.params.get(x));
      }
    });

    request = request.clone({params: cleanedParams});
    return next.handle(request);
  }
}
