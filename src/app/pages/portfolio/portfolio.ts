import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioCardData } from '@core/api/portfolio/portfolio-api.interface';
import { PortfolioAPI } from '@core/api/portfolio/portfolio-api.service';
import { PortfolioCard } from 'src/app/components/portfolio-card/portfolio-card';
import { StorageService } from '@shared/services/storage.service';
import { STORAGE_CONSTANTS } from '@constants/storage.constants';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';

@Component({
 selector: 'app-portfolio',
 imports: [PortfolioCard],
 templateUrl: './portfolio.html',
})
export class Portfolio implements OnInit {
 private readonly portfolioApi = inject(PortfolioAPI)
 private readonly storageService = inject(StorageService)
 private readonly router = inject(Router)

 readonly tabs = [
  { id: 'public', label: 'Public Portfolios' },
  { id: 'mine', label: 'My Portfolios' }
 ] as const

 selectedTab: TabType = 'public'
 portfolioList: PortfolioCardData[] = []
 isLoggedIn = false

 ngOnInit(): void {
  this.isLoggedIn = this.getLoginStatus()
  this.fetchPortfolios()
 }

 selectTab(tabId: TabType): void {
  if (this.selectedTab === tabId) {
   return
  }

  this.selectedTab = tabId
  this.fetchPortfolios()
 }

 goToLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
 }

 createPortfolio(): void {
  if (!this.isLoggedIn) {
   this.goToLogin()
   return
  }

  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio_create])
 }

 private fetchPortfolios(): void {
  this.portfolioList = []

  if (this.selectedTab === 'mine' && !this.isLoggedIn) {
   return
  }

  if (this.selectedTab === 'public') {
   this.portfolioApi.list({ is_private: 0 }).subscribe({
    next: res => this.portfolioList = res.data || []
   })
   return
  }

  const userId = this.getLoggedInUserId()
  if (!userId) {
   this.portfolioList = []
   return
  }

  this.portfolioApi.list({ user_id: userId }).subscribe({
   next: res => this.portfolioList = res.data || []
  })
 }

 private getLoginStatus(): boolean {
  return !!this.storageService.getItem<any>(STORAGE_CONSTANTS.token)
 }

 private getLoggedInUserId(): string | null {
  const token = this.storageService.getItem<any>(STORAGE_CONSTANTS.token)
  return token?.user_id || token?.id || token?.userId || null
 }
}

type TabType = "public" | "mine"