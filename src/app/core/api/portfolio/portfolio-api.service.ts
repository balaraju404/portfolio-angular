import { inject, Injectable } from "@angular/core";
import { APIService } from "@shared/services/api.service";
import { PORTFOLIO_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";
import { PortfolioCardData, PortfolioCreateRequest, PortfolioData, PortfolioDetailsRequest, PortfolioListRequest } from "./portfolio-api.interface";
import { DetailsResponse, SaveResponse } from "../api.interface";

@Injectable({ providedIn: 'root' })
export class PortfolioAPI implements PortfolioApiInterface {

 private readonly apiService = inject(APIService)

 create(request: PortfolioCreateRequest): Observable<SaveResponse> {
  return this.apiService.post(PORTFOLIO_ENDPOINT_URLS.create, request)
 }

 list(request: PortfolioListRequest): Observable<DetailsResponse<PortfolioCardData>> {
  return this.apiService.post(PORTFOLIO_ENDPOINT_URLS.list, request)
 }

 details(request: PortfolioDetailsRequest): Observable<DetailsResponse<PortfolioData>> {
  return this.apiService.post(PORTFOLIO_ENDPOINT_URLS.details, request)
 }

}

interface PortfolioApiInterface {
 create(request: PortfolioCreateRequest): Observable<SaveResponse>;
 list(request: PortfolioListRequest): Observable<DetailsResponse<PortfolioCardData>>;
 details(request: PortfolioDetailsRequest): Observable<DetailsResponse<PortfolioData>>;
}