import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { DashboardData } from '@core/api/public/public-api.interface';
import { PublicAPI } from '@core/api/public/public-api.service';
import { UserStore } from 'src/app/store/user.store';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
 selector: 'app-home',
 standalone: true,
 templateUrl: './home.html',
})
export class Home {
 private readonly publicApi = inject(PublicAPI);
 private readonly destroyRef = inject(DestroyRef);
 readonly navigation = inject(NavigationService);

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