import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessageHistory } from '../Interfaces/IMessageHistory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MessageHistoryService {

  constructor(private _httpClient: HttpClient) {}

  GetAllMessages():Observable< IMessageHistory[]> {
    return this._httpClient.get<IMessageHistory[]>(`${environment.baseUrl}/SentMessages`)
  }
}
