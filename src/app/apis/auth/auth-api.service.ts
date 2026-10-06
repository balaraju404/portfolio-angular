import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { ApiService } from "../../core/services/api.service"
import { API_ENDPOINTS } from "../../core/constants/api-endpoints"
import { ApiResponse } from "../api.model"
import { LoginData, LoginRequest, RegisterData, RegisterRequest } from "./auth-api.model"

@Injectable({ providedIn: "root" })
export class AuthApiService implements IAuthApiService {
 private readonly apiService = inject(ApiService)
 private readonly endpoint = API_ENDPOINTS.AUTH

 login(request: LoginRequest): Observable<LoginResponse> {
  return this.apiService.post<LoginResponse>(this.endpoint.LOGIN, request)
 }

 register(request: RegisterRequest): Observable<RegisterResponse> {
  return this.apiService.post<RegisterResponse>(this.endpoint.REGISTER, request)
 }
}

type LoginResponse = ApiResponse<LoginData>
type RegisterResponse = ApiResponse<RegisterData>

interface IAuthApiService {
 login(request: LoginRequest): Observable<LoginResponse>
 register(request: RegisterRequest): Observable<RegisterResponse>
}