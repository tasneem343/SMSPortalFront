import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogs } from '../Interfaces/ILogs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _httpClient: HttpClient) {}

  GetAllActions():Observable< ILogs[]> {
    return this._httpClient.get<ILogs[]>(`${environment.baseUrl}/Logs`)
  }
}
