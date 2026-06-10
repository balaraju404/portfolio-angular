import { Component, inject } from '@angular/core';
import { FieldWrapper } from "@shared/components/field-wrapper/field-wrapper";
import { Password } from "@shared/components/password/password";
import { Button } from "@shared/components/button/button";
import { ApiHandlingService } from '@shared/services/api-handling.service';
import { Router } from '@angular/router';
import { Constants } from '@shared/services/constants.service';
import { LOGIN_ENDPOINT_URLS } from '@constants/api.constants';
import { Input } from "@shared/components/input/input";
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';

@Component({
 selector: 'app-signup',
 imports: [FieldWrapper, Password, Button, Input],
 templateUrl: './signup.html'
})
export class Signup {

 private readonly apiService = inject(ApiHandlingService)
 private readonly router = inject(Router)

 formData = this.initialFormState()
 loginBtnLoader = false

 ngOnInit() { }

 private initialFormState() {
  return {
   fname: "",
   lname: "",
   login_name: "",
   password: ""
  }
 }

 handleLoginEvent(): void {
  this.handleValidations()
 }

 gotoLoginPage(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
 }

 handleValidations(): void {
  let msg = ""
  const login_name = (this.formData.login_name || "").trim()
  const password = (this.formData.password || "").trim()

  if (!login_name) msg = "Please enter login name"
  else if (!password) msg = "Please enter password"

  if (msg.length) {
   alert(msg)
   return
  }

  this.createUser()
 }

 private createUser(): void {
  const url = Constants.getApiPath(LOGIN_ENDPOINT_URLS.signup)
  this.apiService.post(url, this.formData).subscribe({
   next: res => {
    if (res["status"]) {
     alert(res["msg"])
     this.clearForm()
    }
   }, error: err => {
    alert(err)
   }
  })
 }

 private clearForm(): void {
  this.formData = this.initialFormState()
 }
}