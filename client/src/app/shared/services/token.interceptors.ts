import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.auth.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            })
        }
        
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }


    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if(error.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: {
                    sessionFailed: true
                }
            })
        }
        return throwError(error)
    }
}