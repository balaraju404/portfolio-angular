import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type QueryParams = Record<string, string | number | boolean | null | undefined>;

@Injectable({ providedIn: 'root' })
export class APIService {
 private readonly http = inject(HttpClient);

 // --------------------------------------------------
 // GET
 // --------------------------------------------------

 get<TResponse>(
  url: string,
  params?: QueryParams,
 ): Observable<TResponse> {
  return this.http
   .get<TResponse>(url, { params: this.createParams(params) })
   .pipe(catchError((error) => this.handleError(error)));
 }

 // --------------------------------------------------
 // POST
 // --------------------------------------------------

 post<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
 ): Observable<TResponse> {
  return this.http
   .post<TResponse>(url, body)
   .pipe(catchError((error) => this.handleError(error)));
 }

 // --------------------------------------------------
 // PUT
 // --------------------------------------------------

 put<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
 ): Observable<TResponse> {
  return this.http
   .put<TResponse>(url, body)
   .pipe(catchError((error) => this.handleError(error)),);
 }

 // --------------------------------------------------
 // DELETE
 // --------------------------------------------------

 delete<TResponse>(
  url: string,
  params?: QueryParams,
 ): Observable<TResponse> {
  return this.http
   .delete<TResponse>(url, { params: this.createParams(params) })
   .pipe(catchError((error) => this.handleError(error)));
 }

 // --------------------------------------------------
 // FILE UPLOAD
 // --------------------------------------------------

 upload<TResponse>(
  url: string,
  formData: FormData,
 ): Observable<TResponse> {
  return this.http
   .post<TResponse>(url, formData)
   .pipe(catchError((error) => this.handleError(error)));
 }

 // --------------------------------------------------
 // HTTP PARAMS
 // --------------------------------------------------

 private createParams(params?: QueryParams): HttpParams {
  let httpParams = new HttpParams();

  if (!params) {
   return httpParams;
  }

  for (const [key, value] of Object.entries(params)) {
   if (value === null || value === undefined) {
    continue;
   }

   httpParams = httpParams.set(key, String(value));
  }

  return httpParams;
 }

 // --------------------------------------------------
 // ERROR HANDLING
 // --------------------------------------------------

 private handleError(error: HttpErrorResponse): Observable<never> {
  let message = 'Something went wrong. Please try again later.';

  if (typeof error.error === 'string') {
   message = error.error;
  } else if (error.error && typeof error.error === 'object') {
   message =
    error.error.msg ??
    error.error.message ??
    error.error.error ??
    message;
  }

  return throwError(() => message);
 }
}