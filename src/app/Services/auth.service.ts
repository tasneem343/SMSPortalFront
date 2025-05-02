import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ILogin } from '../Interfaces/ILogin';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<{
    isLoggedIn: boolean;
    role: string | null;
  }>({ isLoggedIn: false, role: null });

  constructor(private _httpClient: HttpClient) {
    this.updateAuthState();
  }

  getAuthState(): Observable<{ isLoggedIn: boolean; role: string | null }> {
    return this.authState.asObservable();
  }

  login(loginUser: ILogin): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/Auth/login`,
      loginUser
    );
  }

  isAuthorized(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      return (
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || null
      );
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  logout(userId:string): Observable<any> {
    return this._httpClient.delete(
      `${environment.baseUrl}/Auth/logout/${userId}`
    );
  }



  updateAuthState(): void {
    const isLoggedIn = this.isAuthorized();
    const role = this.getRole();
    this.authState.next({ isLoggedIn, role });
  }
}