import { Component, inject } from '@angular/core';
import { Button } from '@shared/components/button/button';
import { Input } from '@shared/components/input/input';
import { Password } from '@shared/components/password/password';
import { FieldWrapper } from '@shared/components/field-wrapper/field-wrapper';
import { ToastService } from '@shared/services/toast.service';
import { LoginAPI } from '@core/api/login/login-api.service';
import { UserStore } from 'src/app/store/user.store';
import { NavigationService } from '@shared/services/navigation.service';

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
 readonly navigation = inject(NavigationService);

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
    this.navigation.goToHome()
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