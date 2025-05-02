import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITemplate } from '../Interfaces/ITemplate';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor(private _httpClient: HttpClient) {}

  GetAllTemplates():Observable< ITemplate[]> {
    return this._httpClient.get<ITemplate[]>(`${environment.baseUrl}/MessageTemplates`)
  }
  GetTemplateById(id: number):Observable<ITemplate> {
    return this._httpClient.get<ITemplate>(`${environment.baseUrl}/MessageTemplates/${id}`)
  }
  AddTemplate(template:FormData):Observable<ITemplate> {
    return this._httpClient.post<ITemplate>(`${environment.baseUrl}/MessageTemplates`, template)
  }
  UpdateTemplate(template: ITemplate):Observable<ITemplate> {
    return this._httpClient.put<ITemplate>(`${environment.baseUrl}/MessageTemplates/${template.id}`, template)
  }
  DeleteTemplate(deletedTemplate: ITemplate):Observable<ITemplate> {
    return this._httpClient.delete<ITemplate>(`${environment.baseUrl}/MessageTemplates/${deletedTemplate.id}by${deletedTemplate.deletedby}`)
  }
}
