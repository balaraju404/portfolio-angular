import { inject, Injectable } from "@angular/core";
import { LoginApiInterface, LoginCheckRequest, LoginCheckResponse, LoginSignupRequest, LoginSignupResponse } from "./login-api.interface";
import { APIService } from "@shared/services/api.service";
import { LOGIN_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoginAPI implements LoginApiInterface {

 private readonly apiService = inject(APIService)

 check(request: LoginCheckRequest): Observable<LoginCheckResponse> {
  return this.apiService.post(LOGIN_ENDPOINT_URLS.check, request)
 }
 signup(request: LoginSignupRequest): Observable<LoginSignupResponse> {
  return this.apiService.post(LOGIN_ENDPOINT_URLS.signup, request)
 }
}