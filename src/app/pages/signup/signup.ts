import { Component, inject } from '@angular/core';
import { FieldWrapper } from "@shared/components/field-wrapper/field-wrapper";
import { Password } from "@shared/components/password/password";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/input/input";
import { LoginAPI } from '@core/api/login/login-api.service';
import { ToastService } from '@shared/services/toast.service';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
 selector: 'app-signup',
 imports: [FieldWrapper, Password, Button, Input],
 templateUrl: './signup.html'
})
export class Signup {
 private readonly loginAPI = inject(LoginAPI)
 private readonly toastService = inject(ToastService)
 readonly navigation = inject(NavigationService)

 formData = this.initialFormState()
 loginBtnLoader = false

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

 handleValidations(): void {
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
     setTimeout(() => this.navigation.goToLogin(), 1200)
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
  this.toastService[type](message)
 }
}
