import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { STORAGE_CONSTANTS } from '@constants/storage.constants';
import { UserData } from '@core/api/login/login-api.interface';
import { DashboardData } from '@core/api/public/public-api.interface';
import { PublicAPI } from '@core/api/public/public-api.service';
import { StorageService } from '@shared/services/storage.service';

@Component({
 selector: 'app-home',
 imports: [],
 templateUrl: './home.html',
})
export class Home implements OnInit {
 private readonly router = inject(Router)
 private readonly publicAPI = inject(PublicAPI)
 private readonly storageService = inject(StorageService)

 dashboardData: DashboardData = {
  portfolios_created: 0,
  portfolio_sections: 0,
  portfolio_templates: 0
 }

 ngOnInit(): void {
  this.fetchDashboardData()
 }

 gotoPortfolio(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio])
 }

 getStartedEvent(): void {
  const token = this.storageService.getItem<UserData>(STORAGE_CONSTANTS.token)
  let path = LAYOUT_ROUTES.login
  if (token) {
   path = LAYOUT_ROUTES.portfolio_create
  }
  this.router.navigate([APP_ROUTES.layout, path])
 }

 private fetchDashboardData(): void {
  this.publicAPI.dashboard().subscribe({
   next: res => {
    if (res.data) {
     this.dashboardData = res.data
    }
   }
  })
 }
}