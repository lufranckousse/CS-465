import { Inject, Injectable, Provider } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthAPI = request.url.endsWith('/login') || request.url.endsWith('/register');
    const token = this.storage.getItem('travlr-token');
    if (token && !isAuthAPI) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
