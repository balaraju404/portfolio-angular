import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { Button } from '@shared/components/button/button';
import { Input } from "@shared/components/input/input";
import { Password } from "@shared/components/password/password";
import { FieldWrapper } from "@shared/components/field-wrapper/field-wrapper";
import { StorageService } from '@shared/services/storage.service';
import { ToastService } from '@shared/services/toast.service';
import { STORAGE_CONSTANTS } from '@constants/storage.constants';
import { LoginAPI } from '@core/api/login/login-api.service';

@Component({
 selector: 'app-login',
 imports: [Button, Input, Password, FieldWrapper],
 templateUrl: './login.html'
})
export class Login {
 private readonly loginAPI = inject(LoginAPI)
 private readonly storageService = inject(StorageService)
 private readonly toastService = inject(ToastService)
 private readonly router = inject(Router)

 formData = this.initialFormState()
 loginBtnLoader = false

 ngOnInit() { }

 private initialFormState() {
  return {
   login_name: '',
   password: ''
  }
 }

 handleLoginEvent(): void {
  this.handleValidations()
 }

 gotoSignupPage(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.signup])
 }

 gotoForgotPassword(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.forgor_password])
 }

 handleValidations(): void {
  let msg = ''
  const login_name = (this.formData.login_name || '').trim()
  const password = (this.formData.password || '').trim()

  if (!login_name) msg = 'Please enter username'
  else if (!password) msg = 'Please enter password'

  if (msg.length) {
   this.presentFeedback(msg, 'error')
   return
  }

  this.checkLogin()
 }

 private checkLogin(): void {
  this.loginBtnLoader = true
  this.loginAPI.check(this.formData).subscribe({
   next: res => {
    this.loginBtnLoader = false
    if (res['status']) {
     this.presentFeedback(res['msg'] || 'Successfully logged in', 'success')
     this.handleLoginSuccess(res.data)
    } else {
     this.presentFeedback(res['msg'] || 'Login failed', 'error')
    }
   },
   error: err => {
    this.loginBtnLoader = false
    this.presentFeedback(typeof err === 'string' ? err : 'Unable to login', 'error')
   }
  })
 }

 private handleLoginSuccess(data: any) {
  this.storageService.setItem(STORAGE_CONSTANTS.token, data)
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.home])
 }

 private presentFeedback(message: string, type: 'success' | 'error') {
  this.toastService[type](message)
 }
}