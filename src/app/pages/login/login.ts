import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { Button } from '@shared/components/button/button';
import { Input } from '@shared/components/input/input';
import { Password } from '@shared/components/password/password';
import { FieldWrapper } from '@shared/components/field-wrapper/field-wrapper';
import { ToastService } from '@shared/services/toast.service';
import { LoginAPI } from '@core/api/login/login-api.service';
import { UserStore } from 'src/app/store/user.store';

@Component({
 selector: 'app-login',
 imports: [
  Button,
  Input,
  Password,
  FieldWrapper
 ],
 templateUrl: './login.html'
})
export class Login {
 private readonly loginAPI = inject(LoginAPI);
 private readonly userStore = inject(UserStore);
 private readonly toastService = inject(ToastService);
 private readonly router = inject(Router);

 formData = this.initialFormState();

 loginBtnLoader = false;

 private initialFormState() {
  return {
   login_name: '',
   password: ''
  };
 }

 handleLoginEvent(): void {
  const validationMessage = this.validateForm();

  if (validationMessage) {
   this.presentFeedback(validationMessage, 'error');
   return;
  }

  this.checkLogin();
 }

 gotoSignupPage(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.signup]);
 }

 gotoForgotPassword(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.forgor_password]);
 }

 private validateForm(): string | null {
  const loginName = this.formData.login_name.trim();
  const password = this.formData.password.trim();

  if (!loginName) {
   return 'Please enter username';
  }

  if (!password) {
   return 'Please enter password';
  }

  return null;
 }

 private checkLogin(): void {
  this.loginBtnLoader = true;

  this.loginAPI.check(this.formData).subscribe({
   next: (response) => {
    this.loginBtnLoader = false;

    if (!response.status) {
     this.presentFeedback(response.msg || 'Login failed', 'error');
     return;
    }

    if (!response.data) {
     this.presentFeedback('Invalid login response', 'error');
     return;
    }

    this.userStore.setUser(response.data);
    this.presentFeedback(response.msg || 'Successfully logged in', 'success');
    this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.home]);
   }, error: () => {
    this.loginBtnLoader = false;
    this.presentFeedback('Unable to login', 'error');
   },
  });
 }

 private presentFeedback(message: string, type: 'success' | 'error'): void {
  this.toastService[type](message);
 }
}