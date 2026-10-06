import { Component, inject } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AuthApiService } from "../../apis/auth/auth-api.service"
import { RouteService } from "../../core/services/route.service"

@Component({
 selector: "app-login",
 imports: [FormsModule],
 templateUrl: "./login.html"
})
export class Login {

 private readonly authApiService = inject(AuthApiService)
 readonly routeService = inject(RouteService)

 email = ""
 password = ""

 submitted = false
 isLoading = false
 showPassword = false
 serverError = ""

 handleLogin(): void {
  this.submitted = true
  this.serverError = ""

  if (!this.email || !this.isValidEmail() || this.password.length < 6) {
   return
  }

  this.isLoading = true

  this.authApiService.login({
   email: this.email.trim(),
   password: this.password
  }).subscribe({
   next: ({ success, message }) => {
    this.isLoading = false

    if (!success) {
     this.serverError = message || "Unable to login. Please try again."
     return
    }

    this.routeService.home()
   },
   error: error => {
    this.isLoading = false
    this.serverError = error?.error?.message || "Unable to login. Please check your credentials and try again."
   }
  })
 }

 togglePassword(): void {
  this.showPassword = !this.showPassword
 }

 private isValidEmail(): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())
 }
}