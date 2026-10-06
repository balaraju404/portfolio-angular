import { Injectable, inject } from "@angular/core"
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({ providedIn: "root" })
export class ApiService {
 private readonly http = inject(HttpClient)

 get<T>(
  url: string,
  params?: Record<string, string | number | boolean>
 ): Observable<T> {
  const httpParams = params
   ? new HttpParams({ fromObject: this.convertParams(params) })
   : undefined

  return this.http.get<T>(url, { params: httpParams })
 }

 post<T>(
  url: string,
  body?: unknown,
  headers?: HttpHeaders
 ): Observable<T> {
  return this.http.post<T>(url, body, { headers })
 }

 put<T>(
  url: string,
  body?: unknown,
  headers?: HttpHeaders
 ): Observable<T> {
  return this.http.put<T>(url, body, { headers })
 }

 patch<T>(
  url: string,
  body?: unknown,
  headers?: HttpHeaders
 ): Observable<T> {
  return this.http.patch<T>(url, body, { headers })
 }

 delete<T>(url: string): Observable<T> {
  return this.http.delete<T>(url)
 }

 private convertParams(
  params: Record<string, string | number | boolean>
 ): Record<string, string> {
  return Object.entries(params).reduce(
   (result, [key, value]) => {
    result[key] = String(value)
    return result
   },
   {} as Record<string, string>
  )
 }
}