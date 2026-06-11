import { Component, inject } from '@angular/core';
import { FieldWrapper } from "@shared/components/field-wrapper/field-wrapper";
import { Password } from "@shared/components/password/password";
import { Button } from "@shared/components/button/button";
import { Router } from '@angular/router';
import { Input } from "@shared/components/input/input";
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { LoginAPI } from '@core/api/login/login-api.service';

@Component({
 selector: 'app-signup',
 imports: [FieldWrapper, Password, Button, Input],
 templateUrl: './signup.html'
})
export class Signup {

 private readonly loginAPI = inject(LoginAPI)
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
  const fname = (this.formData.fname || "").trim()
  const lname = (this.formData.lname || "").trim()
  const login_name = (this.formData.login_name || "").trim()
  const password = (this.formData.password || "").trim()

  if (!fname) msg = "Please enter first name"
  else if (!lname) msg = "Please enter last name"
  else if (!login_name) msg = "Please enter login name"
  else if (!password) msg = "Please enter password"

  if (msg.length) {
   alert(msg)
   return
  }

  this.createUser()
 }

 private createUser(): void {
  this.loginAPI.signup(this.formData).subscribe({
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