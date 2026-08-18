import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { UserStore } from 'src/app/store/user.store';

@Injectable({ providedIn: 'root' })
export class NavigationService {
 private readonly router = inject(Router);
 private readonly userStore = inject(UserStore);

 layoutRoute(route: string) {
  return this.router.navigate([APP_ROUTES.layout, route]);
 }

 goToLogin() {
  return this.layoutRoute(LAYOUT_ROUTES.login);
 }

 goToSignup() {
  return this.layoutRoute(LAYOUT_ROUTES.signup);
 }

 goToForgotPassword() {
  return this.layoutRoute(LAYOUT_ROUTES.forgot_password);
 }

 goToHome() {
  return this.layoutRoute(LAYOUT_ROUTES.home);
 }

 goToPortfolio() {
  return this.layoutRoute(LAYOUT_ROUTES.portfolio);
 }

 goToCreatePortfolio() {
  if (this.userStore.isLoggedIn()) {
   return this.layoutRoute(LAYOUT_ROUTES.portfolio_create);
  } else {
   return this.goToLogin()
  }
 }

 goToAbout() {
  return this.layoutRoute(LAYOUT_ROUTES.about);
 }

 goToContactUs() {
  return this.layoutRoute(LAYOUT_ROUTES.contact_us);
 }

 goBack() {
  window.history.back();
 }
}