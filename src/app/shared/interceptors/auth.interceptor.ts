import { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { catchError, finalize, throwError } from "rxjs"

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const router = inject(Router)
 // Util.LOADER_ON.next(true)

 const token = localStorage.getItem("token")

 // ✅ Clone request with token if present
 const clonedReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req

 return next(clonedReq).pipe(
  catchError((error) => {
   console.error("HTTP Interceptor caught an error:", error)

   if (error.status === 401) {
    localStorage.clear()
    alert("Session expired. Please log in again.")
    router.navigate(["/login"])
   } else if (error.status === 403) {
    alert("You do not have permission to perform this action.")
   }

   return throwError(() => error)
  }),
  finalize(() => {
   // Util.LOADER_ON.next(false)
  })
 )
}