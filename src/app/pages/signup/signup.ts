import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FieldWrapper } from "@shared/components/field-wrapper/field-wrapper";
import { Password } from "@shared/components/password/password";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/input/input";
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { LoginAPI } from '@core/api/login/login-api.service';

@Component({
 selector: 'app-signup',
 imports: [FieldWrapper, Password, Button, Input, NgClass],
 templateUrl: './signup.html'
})
export class Signup {
 private readonly loginAPI = inject(LoginAPI)
 private readonly router = inject(Router)

 formData = this.initialFormState()
 loginBtnLoader = false
 feedbackMessage = ''
 feedbackType: 'success' | 'error' = 'error'

 ngOnInit() { }

 private initialFormState() {
  return {
   fname: '',
   lname: '',
   login_name: '',
   password: ''
  }
 }

 handleLoginEvent(): void {
  this.handleValidations()
 }

 gotoLoginPage(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
 }

 handleValidations(): void {
  this.feedbackMessage = ''
  let msg = ''
  const fname = (this.formData.fname || '').trim()
  const lname = (this.formData.lname || '').trim()
  const login_name = (this.formData.login_name || '').trim()
  const password = (this.formData.password || '').trim()

  if (!fname) msg = 'Please enter first name'
  else if (!lname) msg = 'Please enter last name'
  else if (!login_name) msg = 'Please enter username'
  else if (!password) msg = 'Please enter password'

  if (msg.length) {
   this.presentFeedback(msg, 'error')
   return
  }

  this.createUser()
 }

 private createUser(): void {
  this.loginBtnLoader = true
  this.loginAPI.signup(this.formData).subscribe({
   next: res => {
    this.loginBtnLoader = false
    if (res['status']) {
     this.presentFeedback(res['msg'] || 'Account created successfully', 'success')
     setTimeout(() => this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login]), 1200)
    } else {
     this.presentFeedback(res['msg'] || 'Unable to create account', 'error')
    }
   },
   error: err => {
    this.loginBtnLoader = false
    this.presentFeedback(typeof err === 'string' ? err : 'Unable to create account', 'error')
   }
  })
 }

 private presentFeedback(message: string, type: 'success' | 'error') {
  this.feedbackMessage = message
  this.feedbackType = type
 }
}
