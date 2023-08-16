import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environments';
import {
  NewUser,
  UsersData,
  UsersResponse,
} from '../interfaces/users.interface';
import { SaveResponse } from '../../groups/interfaces/groups.interface';
import { add_user, get_users } from './users.endpoints';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl: string = environment.baseURL;
  private token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponse> {
    const request = {
      id: 2,
      nombre: '',
    };

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.post<UsersResponse>(
      `${this.baseUrl}${get_users}`,
      request,
      { headers }
    );
  }

  addUser(group: NewUser) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.post<SaveResponse>(`${this.baseUrl}${add_user}`, group, {
      headers,
    });
  }
}
