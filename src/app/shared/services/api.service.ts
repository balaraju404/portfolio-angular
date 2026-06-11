import { inject, Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class APIService {
 private readonly http: HttpClient = inject(HttpClient)

 get(url: string, params?: any): Observable<any> {
  let httpParams = new HttpParams()
  if (params) {
   Object.keys(params).forEach(key => httpParams = httpParams.set(key, params[key]))
  }
  return this.http.get(url, { params }).pipe(catchError(this.handleError))
 }

 post(url: string, data: any): Observable<any> {
  return this.http.post(url, data).pipe(catchError(this.handleError))
 }

 put(url: string, data: any): Observable<any> {
  return this.http.put(url, data).pipe(catchError(this.handleError))
 }

 delete(url: string, params?: any): Observable<any> {
  let httpParams = new HttpParams()
  if (params) {
   Object.keys(params).forEach(key => httpParams = httpParams.set(key, params[key]))
  }
  return this.http.delete(url, { params }).pipe(catchError(this.handleError))
 }

 upload(url: string, formData: FormData): Observable<any> {
  return this.http.post(url, formData).pipe(catchError(this.handleError))
 }

 private handleError(error: HttpErrorResponse) {
  console.log("API Error:", error)

  let errorMsg = "Something went wrong. Please try again later."

  // Handle different error formats
  if (error.error.error) {
   errorMsg = error.error.error
  }

  return throwError(() => errorMsg)
 }
}