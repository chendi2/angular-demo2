import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import { tap,catchError } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class UpdateTokenInterceptor implements HttpInterceptor {
  error_reason1:string = "token验证不通过"

  constructor(private authService:AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(event);
          let token = event.headers.get("USER-LOGIN-TOKEN")
          if (token!=null){
            console.log('update token!');
            this.authService.updateToken(token)
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error.text == this.error_reason1) {
          // 跳转到登录页面
          // 在这里执行特定于状态码为 304 的处理逻辑
          this.router.navigate(['/user/login']);
          return EMPTY;
        } else {
          return throwError(error);
        }
      })

    );
  }
}
