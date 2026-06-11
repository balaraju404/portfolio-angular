import { inject, Injectable } from "@angular/core";
import { LoginApiInterface, LoginCheckRequest, LoginCheckResponse, LoginSignupRequest, LoginSignupResponse } from "./login-api.interface";
import { APIService } from "@shared/services/api.service";
import { Constants } from "@core/services/constants.service";
import { LOGIN_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoginAPI implements LoginApiInterface {

 private readonly apiService = inject(APIService)

 check(request: LoginCheckRequest): Observable<LoginCheckResponse> {
  const url = Constants.getApiPath(LOGIN_ENDPOINT_URLS.check)
  return this.apiService.post(url, request)
 }
 signup(request: LoginSignupRequest): Observable<LoginSignupResponse> {
  const url = Constants.getApiPath(LOGIN_ENDPOINT_URLS.signup)
  return this.apiService.post(url, request)
 }
}