import { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { catchError, finalize, throwError } from "rxjs"
import { ToastService } from "@shared/services/toast.service"

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const router = inject(Router)
 const toastService = inject(ToastService)
 // Util.LOADER_ON.next(true)

 const token = localStorage.getItem("token")

 // ✅ Clone request with token if present
 const clonedReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req

 return next(clonedReq).pipe(
  catchError((error) => {
   console.error("HTTP Interceptor caught an error:", error)

   if (error.status === 401) {
    localStorage.clear()
    toastService.error("Session expired. Please log in again.")
    router.navigate(["/login"])
   } else if (error.status === 403) {
    toastService.error("You do not have permission to perform this action.")
   }

   return throwError(() => error)
  }),
  finalize(() => {
   // Util.LOADER_ON.next(false)
  })
 )
}