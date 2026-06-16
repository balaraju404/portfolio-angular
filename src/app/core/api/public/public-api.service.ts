import { inject, Injectable } from "@angular/core";
import { APIService } from "@shared/services/api.service";
import { Constants } from "@core/services/constants.service";
import { PUBLIC_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";
import { DashboardResponse } from "./public-api.interface";

@Injectable({ providedIn: 'root' })
export class PublicAPI implements PublicApiInterface {

 private readonly apiService = inject(APIService)

 dashboard(): Observable<DashboardResponse> {
  const url = Constants.getApiPath(PUBLIC_ENDPOINT_URLS.dashboard)
  return this.apiService.post(url, {})
 }

}

interface PublicApiInterface {
 dashboard(): Observable<DashboardResponse>;
}