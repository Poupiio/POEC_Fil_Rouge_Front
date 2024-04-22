import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyhttpService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: this.auth.token ? `Bearer ${this.auth.token}` : ""
      }
    });
    const apiReq = authReq.clone({ url: `http://localhost:8080${req.url}` });
    return next.handle(apiReq);
  }
}
