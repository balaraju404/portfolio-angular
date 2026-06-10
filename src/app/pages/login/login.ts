import { Component, inject } from '@angular/core';
import { ApiHandlingService } from '../../shared/services/api-handling.service';
import { Router } from '@angular/router';
import { Constants } from '../../shared/services/constants.service';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { Button } from '@shared/components/button/button';
import { Input } from "@shared/components/input/input";
import { Password } from "@shared/components/password/password";
import { FieldWrapper } from "@shared/components/field-wrapper/field-wrapper";
import { StorageService } from '@shared/services/storage.service';
import { STORAGE_CONSTANTS } from '@constants/storage.constants';
import { LOGIN_ENDPOINT_URLS } from '@constants/api.constants';

@Component({
 selector: 'app-login',
 imports: [Button, Input, Password, FieldWrapper],
 templateUrl: './login.html'
})
export class Login {

 private readonly apiService = inject(ApiHandlingService)
 private readonly storageService = inject(StorageService)
 private readonly router = inject(Router)

 formData = this.initialFormState()
 loginBtnLoader = false

 ngOnInit() { }

 private initialFormState() {
  return {
   login_name: "",
   password: ""
  }
 }

 handleLoginEvent(): void {
  this.handleValidations()
 }

 gotoSignupPage(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.signup])
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

  this.checkLogin()
 }

 private checkLogin(): void {
  const url = Constants.getApiPath(LOGIN_ENDPOINT_URLS.check)
  this.apiService.post(url, this.formData).subscribe({
   next: res => {
    if (res["status"]) {
     alert(res["msg"])
     this.hanldeLoginSucess(res.data)
    }
   }, error: err => {
    alert(err)
   }
  })
 }

 private hanldeLoginSucess(data: any) {
  this.storageService.setItem(STORAGE_CONSTANTS.token, data)
  this.router.navigate([APP_ROUTES.layout])
 }
}