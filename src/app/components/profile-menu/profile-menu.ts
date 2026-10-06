import { ChangeDetectionStrategy, Component, computed, inject, output } from "@angular/core"
import { AuthStore } from "../../store/auth.store"
import { UserRoleEnum } from "../../apis/auth/auth-api.model"
import { RouteService } from "../../core/services/route.service"
import { AuthApiService } from "../../apis/auth/auth-api.service"

@Component({
 selector: "app-profile-menu",
 templateUrl: "./profile-menu.html",
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMenu {

 private readonly authStore = inject(AuthStore)
 private readonly routeService = inject(RouteService)
 private readonly authApiService = inject(AuthApiService)

 readonly profileMenuEnum = ProfileMenuEnum
 readonly actionEvent = output<ProfileMenuEnum>()

 readonly isAdmin = computed(() => this.authStore.user()?.role == UserRoleEnum.Admin)

 handleAction(action: ProfileMenuEnum): void {
  this.actionEvent.emit(action)
 }

 profileClick(): void {
  this.handleAction(ProfileMenuEnum.Profile)
  this.routeService.profile()
 }

 logoutClick(): void {
  this.handleAction(ProfileMenuEnum.Logout)
  this.authApiService.logout()
 }

 sectionsClick(): void {
  this.handleAction(ProfileMenuEnum.Sections)
  this.routeService.sections()
 }
}

export enum ProfileMenuEnum {
 Profile = "profile",
 Logout = "logout",
 Sections = "sections"
}