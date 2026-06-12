import { inject, Injectable } from "@angular/core";
import { APIService } from "@shared/services/api.service";
import { Constants } from "@core/services/constants.service";
import { PORTFOLIO_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";
import { PortfolioCardData, PortfolioCreateRequest, PortfolioData, PortfolioDetailsRequest, PortfolioListRequest } from "./portfolio-api.interface";
import { DetailsResponse, SaveResponse } from "../api.interface";

@Injectable({ providedIn: 'root' })
export class PortfolioAPI implements PortfolioApiInterface {

 private readonly apiService = inject(APIService)

 create(request: PortfolioCreateRequest): Observable<SaveResponse> {
  const url = Constants.getApiPath(PORTFOLIO_ENDPOINT_URLS.create)
  return this.apiService.post(url, request)
 }

 list(request: PortfolioListRequest): Observable<DetailsResponse<PortfolioCardData>> {
  const url = Constants.getApiPath(PORTFOLIO_ENDPOINT_URLS.list)
  return this.apiService.post(url, request)
 }

 details(request: PortfolioDetailsRequest): Observable<DetailsResponse<PortfolioData>> {
  const url = Constants.getApiPath(PORTFOLIO_ENDPOINT_URLS.details)
  return this.apiService.post(url, request)
 }

}

interface PortfolioApiInterface {
 create(request: PortfolioCreateRequest): Observable<SaveResponse>;
 list(request: PortfolioListRequest): Observable<DetailsResponse<PortfolioCardData>>;
 details(request: PortfolioDetailsRequest): Observable<DetailsResponse<PortfolioData>>;
}