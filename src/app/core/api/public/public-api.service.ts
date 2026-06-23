import { inject, Injectable } from "@angular/core";
import { APIService } from "@shared/services/api.service";
import { PUBLIC_ENDPOINT_URLS } from "@constants/api.constants";
import { Observable } from "rxjs";
import { DashboardResponse } from "./public-api.interface";

@Injectable({ providedIn: 'root' })
export class PublicAPI implements PublicApiInterface {

 private readonly apiService = inject(APIService)

 dashboard(): Observable<DashboardResponse> {
  return this.apiService.post(PUBLIC_ENDPOINT_URLS.dashboard, {})
 }

}

interface PublicApiInterface {
 dashboard(): Observable<DashboardResponse>;
}