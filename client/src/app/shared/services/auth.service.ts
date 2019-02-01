import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { User } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = null

  constructor(private http: HttpClient) {
  }

  register() {}

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
    .pipe(
      // оператор tap() позволяет достать данные из стрима
      tap(
        ({token}) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        }
      )
    )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
   return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
