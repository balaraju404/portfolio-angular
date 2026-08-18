import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '@shared/services/api.service';
import { LOGIN_ENDPOINT_URLS } from '@constants/api.constants';
import { LoginCheckRequest, LoginCheckResponse, LoginSignupRequest, LoginSignupResponse, } from './login-api.interface';

@Injectable({ providedIn: 'root' })
export class LoginAPI implements LoginApiInterface {
 private readonly apiService = inject(APIService);

 check(request: LoginCheckRequest): Observable<LoginCheckResponse> {
  return this.apiService.post<LoginCheckResponse>(LOGIN_ENDPOINT_URLS.check, request);
 }

 signup(request: LoginSignupRequest): Observable<LoginSignupResponse> {
  return this.apiService.post<LoginSignupResponse>(LOGIN_ENDPOINT_URLS.signup, request);
 }
}

interface LoginApiInterface {
 check(request: LoginCheckRequest): Observable<LoginCheckResponse>;
 signup(request: LoginSignupRequest): Observable<LoginSignupResponse>;
}