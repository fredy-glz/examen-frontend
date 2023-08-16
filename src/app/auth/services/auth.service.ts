import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';

import { environment } from '../../../environments/environments';
import { User } from '../interfaces/auth.interface';
import { login, logout } from './auth.endpoints';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = environment.baseURL;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>(`${this.baseURL}${login}`, { username, password })
      .pipe(
        tap((user) => (this.user = user)),
        tap(({ jwttoken }) => localStorage.setItem('token', jwttoken))
      );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    return of(true);
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
    return this.http.post<any>(`${this.baseURL}${logout}`, {
      username: 'admin',
    });
  }
}
