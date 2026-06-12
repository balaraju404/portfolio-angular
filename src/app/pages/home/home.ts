import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';

@Component({
 selector: 'app-home',
 imports: [],
 templateUrl: './home.html',
})
export class Home {
 private readonly router = inject(Router)

 gotoPortfolio(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio])
 }
 gotoLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
 }
}