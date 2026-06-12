import {
 Component,
 OnInit,
 inject,
 signal,
} from '@angular/core'
import { Router } from '@angular/router'

import { PortfolioCardData } from '@core/api/portfolio/portfolio-api.interface'
import { PortfolioAPI } from '@core/api/portfolio/portfolio-api.service'
import { PortfolioCard } from 'src/app/components/portfolio-card/portfolio-card'

import { StorageService } from '@shared/services/storage.service'

import { STORAGE_CONSTANTS } from '@constants/storage.constants'
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants'
import { UserData } from '@core/api/login/login-api.interface'

type TabType = 'public' | 'mine'

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
  { id: 'mine', label: 'My Portfolios' },
 ] as const

 readonly selectedTab = signal<TabType>('public')
 readonly portfolioList = signal<PortfolioCardData[]>([])
 readonly loader = signal(false)

 ngOnInit(): void {
  this.loadPortfolios()
 }

 selectTab(tabId: TabType): void {
  if (this.selectedTab() === tabId) {
   return
  }

  this.selectedTab.set(tabId)
  this.loadPortfolios()
 }

 createPortfolio(): void {
  if (!this.isLoggedIn()) {
   this.navigateToLogin()
   return
  }

  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio_create])
 }

 private loadPortfolios(): void {
  this.portfolioList.set([])

  if (this.selectedTab() === 'public') {
   this.loadPublicPortfolios()
   return
  }

  const userId = this.getUserId()

  if (!userId) {
   return
  }

  this.loadUserPortfolios(userId)
 }

 private loadPublicPortfolios(): void {
  this.loader.set(true)

  this.portfolioApi
   .list({ is_private: 0 })
   .subscribe({
    next: ({ data }) => {
     this.portfolioList.set(data ?? [])
    },
    complete: () => this.loader.set(false),
   })
 }

 private loadUserPortfolios(userId: string): void {
  this.loader.set(true)

  this.portfolioApi
   .list({ user_id: userId })
   .subscribe({
    next: ({ data }) => {
     this.portfolioList.set(data ?? [])
    },
    complete: () => this.loader.set(false),
   })
 }

 navigateToLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
 }

 isLoggedIn(): boolean {
  return !!this.storageService.getItem(STORAGE_CONSTANTS.token)
 }

 private getUserId(): string | null {
  const token = this.storageService.getItem<UserData>(STORAGE_CONSTANTS.token)
  return (token?.user_id ?? null)
 }
}