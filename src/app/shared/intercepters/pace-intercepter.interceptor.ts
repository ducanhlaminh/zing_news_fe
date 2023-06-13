import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
declare var Pace: any;
@Injectable()
export class PaceInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    Pace.start(); // Kích hoạt Pace.js trước khi gửi request

    return next.handle(request).pipe(
      finalize(() => {
        Pace.stop(); // Tắt Pace.js sau khi nhận được response
      })
    );
  }
}
