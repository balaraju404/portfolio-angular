import { Component, inject } from "@angular/core"
import { AsyncPipe } from "@angular/common"
import { HEADER_TABS } from "../../core/constants/header-tabs.constant"
import { RouteService } from "../../core/services/route.service"
import { APP_NAME } from "../../core/constants/constants"

@Component({
 imports: [AsyncPipe],
 selector: "app-header",
 templateUrl: "./header.html"
})
export class Header {

 private readonly routeService = inject(RouteService)

 readonly appName = APP_NAME
 readonly tabs = HEADER_TABS
 readonly currentRoute$ = this.routeService.currentRoute$

 navigate(route: string): void {
  this.routeService.navigateTo(route)
 }

 login(): void {
  this.routeService.login()
 }

 profile(): void {
  this.routeService.profile()
 }

 home(): void {
  this.routeService.home()
 }
}