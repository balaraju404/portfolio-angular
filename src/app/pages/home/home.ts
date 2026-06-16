import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { DashboardData } from '@core/api/public/public-api.interface';
import { PublicAPI } from '@core/api/public/public-api.service';

@Component({
 selector: 'app-home',
 imports: [],
 templateUrl: './home.html',
})
export class Home implements OnInit {
 private readonly router = inject(Router)
 private readonly publicAPI = inject(PublicAPI)

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
 gotoLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
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