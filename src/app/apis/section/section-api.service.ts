import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { ApiService } from "../../core/services/api.service"
import { API_ENDPOINTS } from "../../core/constants/api-endpoints"
import { ApiPagingResponse, ApiResponse } from "../api.model"
import { Section, SectionCreateRequest, SectionUpdateRequest } from "./section-api.model"

@Injectable({ providedIn: "root" })
export class SectionApiService implements ISectionApiService {
 private readonly apiService = inject(ApiService)
 private readonly endpoint = API_ENDPOINTS.SECTION

 create(request: SectionCreateRequest): Observable<SectionCreateResponse> {
  return this.apiService.post<SectionCreateResponse>(this.endpoint.CREATE, request)
 }

 update(id: string, request: SectionUpdateRequest): Observable<SectionUpdateResponse> {
  return this.apiService.put<SectionUpdateResponse>(this.endpoint.UPDATE(id), request)
 }

 delete(id: string): Observable<SectionDeleteResponse> {
  return this.apiService.delete<SectionDeleteResponse>(this.endpoint.DELETE(id))
 }

 toggle(id: string): Observable<SectionToggleResponse> {
  return this.apiService.patch<SectionToggleResponse>(this.endpoint.TOGGLE(id), {})
 }

 getById(id: string): Observable<SectionGetResponse> {
  return this.apiService.get<SectionGetResponse>(this.endpoint.GET_BY_ID(id))
 }

 getAll(): Observable<SectionListResponse> {
  return this.apiService.get<SectionListResponse>(this.endpoint.ALL)
 }

 getPaging(page: number, limit: number): Observable<SectionPagingResponse> {
  return this.apiService.post<SectionPagingResponse>(this.endpoint.PAGING, { page, limit })
 }
}

export interface ISectionApiService {
 create(request: SectionCreateRequest): Observable<SectionCreateResponse>
 update(id: string, request: SectionUpdateRequest): Observable<SectionUpdateResponse>
 delete(id: string): Observable<SectionDeleteResponse>
 toggle(id: string): Observable<SectionToggleResponse>
 getById(id: string): Observable<SectionGetResponse>
 getAll(): Observable<SectionListResponse>
 getPaging(page: number, limit: number): Observable<SectionPagingResponse>
}

type SectionCreateResponse = ApiResponse<Section>
type SectionUpdateResponse = ApiResponse<Section>
type SectionDeleteResponse = ApiResponse<null>
type SectionToggleResponse = ApiResponse<Section>
type SectionGetResponse = ApiResponse<Section>
type SectionListResponse = ApiResponse<Section[]>
type SectionPagingResponse = ApiPagingResponse<Section>