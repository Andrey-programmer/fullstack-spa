import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.auth.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            })
        }
        
        return next.handle(request)
    }
}