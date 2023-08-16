import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environments';
import {
  GroupData,
  GroupResponse,
  SaveResponse,
} from '../interfaces/groups.interface';
import { add_group, get_groups } from './groups.endpoints';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private baseUrl: string = environment.baseURL;
  private token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<GroupResponse> {
    const request = {
      id: 0,
      grupo: null,
      numero: 0,
    };

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.post<GroupResponse>(
      `${this.baseUrl}${get_groups}`,
      request,
      { headers }
    );
  }

  addGroup(group: GroupData) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.post<SaveResponse>(`${this.baseUrl}${add_group}`, group, {
      headers,
    });
  }
}
