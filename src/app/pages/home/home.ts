import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { DashboardData } from '@core/api/public/public-api.interface';
import { PublicAPI } from '@core/api/public/public-api.service';
import { UserStore } from 'src/app/store/user.store';

@Component({
 selector: 'app-home',
 standalone: true,
 templateUrl: './home.html',
})
export class Home {
 private readonly router = inject(Router);
 private readonly publicApi = inject(PublicAPI);
 private readonly destroyRef = inject(DestroyRef);

 readonly userStore = inject(UserStore);

 readonly dashboardData = signal<DashboardData>({
  portfolios_created: 0,
  portfolio_sections: 0,
  portfolio_templates: 0
 });

 readonly loading = signal(false);

 constructor() {
  this.fetchDashboardData();
 }

 gotoPortfolio(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio]);
 }

 getStarted(): void {
  const route = this.userStore.isLoggedIn()
   ? LAYOUT_ROUTES.portfolio_create
   : LAYOUT_ROUTES.login;

  this.router.navigate([APP_ROUTES.layout, route]);
 }

 private fetchDashboardData(): void {
  this.loading.set(true);

  this.publicApi
   .dashboard()
   .pipe(
    takeUntilDestroyed(this.destroyRef),
    finalize(() => this.loading.set(false))
   )
   .subscribe({
    next: (response) => {
     if (!response.status) {
      return;
     }

     this.dashboardData.set(response.data);
    },

    error: () => {
     // Optionally show a toast here.
    }
   });
 }
}