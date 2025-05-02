import { Injectable } from '@angular/core';
import { ISendMessage } from '../Interfaces/ISendMessage';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendmessageService {
  constructor(private _httpClient: HttpClient) {}


  AddMessage(message:FormData):Observable<ISendMessage> {
    return this._httpClient.post<ISendMessage>(`${environment.baseUrl}/Messages/send`, message)
  }
  AddMessageCsv(message:FormData):Observable<ISendMessage> {
    return this._httpClient.post<ISendMessage>(`${environment.baseUrl}/Messages/send-bulk`, message)
  }
}
