import { inject, Injectable } from "@angular/core";
import { APIService } from "@shared/services/api.service";
import { Constants } from "@core/services/constants.service";
import { PORTFOLIO_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";
import { PortfolioApiInterface, PortfolioCreateRequest, PortfolioCreateResponse, PortfolioDetailsRequest, PortfolioDetailsResponse, PortfolioListRequest, PortfolioListResponse } from "./portfolio-api.interface";

@Injectable({ providedIn: 'root' })
export class PortfolioAPI implements PortfolioApiInterface {

 private readonly apiService = inject(APIService)

 create(request: PortfolioCreateRequest): Observable<PortfolioCreateResponse> {
  const url = Constants.getApiPath(PORTFOLIO_ENDPOINT_URLS.create)
  return this.apiService.post(url, request)
 }

 list(request: PortfolioListRequest): Observable<PortfolioListResponse> {
  const url = Constants.getApiPath(PORTFOLIO_ENDPOINT_URLS.list)
  return this.apiService.post(url, request)
 }

 details(request: PortfolioDetailsRequest): Observable<PortfolioDetailsResponse> {
  const url = Constants.getApiPath(PORTFOLIO_ENDPOINT_URLS.details)
  return this.apiService.post(url, request)
 }

}