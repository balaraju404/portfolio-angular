import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { PortfolioAPI } from '@core/api/portfolio/portfolio-api.service';
import { PortfolioCardData } from '@core/api/portfolio/portfolio-api.interface';
import { PortfolioCard } from 'src/app/components/portfolio-card/portfolio-card';
import { UserStore } from 'src/app/store/user.store';

type TabType = 'public' | 'mine';

@Component({
 selector: 'app-portfolio',
 imports: [PortfolioCard],
 templateUrl: './portfolio.html',
})
export class Portfolio {
 private readonly portfolioApi = inject(PortfolioAPI);
 private readonly router = inject(Router);
 private readonly destroyRef = inject(DestroyRef);

 readonly userStore = inject(UserStore);

 readonly tabs = [
  { id: 'public', label: 'Public Portfolios' },
  { id: 'mine', label: 'My Portfolios' },
 ] as const;

 readonly selectedTab = signal<TabType>('public');

 readonly portfolioList = signal<PortfolioCardData[]>([]);
 readonly loader = signal(false);

 constructor() {
  this.loadPortfolios();
 }

 selectTab(tab: TabType): void {
  if (this.selectedTab() === tab) {
   return;
  }

  this.selectedTab.set(tab);
  this.loadPortfolios();
 }

 createPortfolio(): void {
  if (!this.userStore.isLoggedIn()) {
   this.navigateToLogin();
   return;
  }

  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio_create]);
 }

 navigateToLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login]);
 }

 private loadPortfolios(): void {
  const tab = this.selectedTab();

  if (tab === 'mine' && !this.userStore.userId()) {
   this.portfolioList.set([]);
   return;
  }

  this.loader.set(true);

  const request = tab === 'public'
   ? this.portfolioApi.list({ is_private: 0 })
   : this.portfolioApi.list({ user_id: this.userStore.userId()! });

  request
   .pipe(
    takeUntilDestroyed(this.destroyRef),
    tap(() => this.portfolioList.set([])),
    catchError(() => {
     this.portfolioList.set([]);
     return of(null);
    }),
    finalize(() => this.loader.set(false))
   )
   .subscribe((response) => {
    if (!response) {
     return;
    }

    this.portfolioList.set(response.data ?? []);
   });
 }
}