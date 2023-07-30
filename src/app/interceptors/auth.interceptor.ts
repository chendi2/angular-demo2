import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const local_token = localStorage.getItem("token");
    const session_token = sessionStorage.getItem("token")
    const token = local_token != null?local_token:session_token
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set("USER-LOGIN-TOKEN", token)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
      // 或者做替他处理，例如跳转到401页面等
    }
  }
}
