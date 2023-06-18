import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
declare var Pace: any;
@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: token },
      });
    }
    Pace.start(); // Kích hoạt Pace.js trước khi gửi request
    return next.handle(request).pipe(
      finalize(() => {
        Pace.stop(); // Tắt Pace.js sau khi nhận được response
      })
    );
  }
}
