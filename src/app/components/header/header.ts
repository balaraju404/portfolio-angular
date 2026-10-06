import { AsyncPipe } from "@angular/common"
import { Component, computed, inject, signal } from "@angular/core"
import { APP_NAME } from "../../core/constants/constants"
import { HEADER_TABS } from "../../core/constants/header-tabs.constant"
import { OutsideClickDirective } from "../../core/directives/outside-click.directive"
import { RouteService } from "../../core/services/route.service"
import { AuthStore } from "../../store/auth.store"
import { ProfileMenu, ProfileMenuEnum } from "../profile-menu/profile-menu"

@Component({
 imports: [AsyncPipe, OutsideClickDirective, ProfileMenu],
 selector: "app-header",
 templateUrl: "./header.html"
})
export class Header {
 readonly routeService = inject(RouteService)
 readonly authStore = inject(AuthStore)

 readonly appName = APP_NAME
 readonly tabs = HEADER_TABS
 readonly currentRoute$ = this.routeService.currentRoute$

 readonly displayUserName = computed(() => {
  const name = this.authStore.user()?.name || ""
  return `${name.at(0) ?? ""}${name.at(1) ?? ""}`
 })

 readonly profileMenuOpen = signal(false)

 navigate(route: string): void {
  this.routeService.navigateTo(route)
 }

 toggleProfileMenu(): void {
  this.profileMenuOpen.update(isOpen => !isOpen)
 }

 closeProfileMenu(): void {
  this.profileMenuOpen.set(false)
 }

 handleProfileMentAction(action: ProfileMenuEnum): void {
  this.closeProfileMenu()
 }
}