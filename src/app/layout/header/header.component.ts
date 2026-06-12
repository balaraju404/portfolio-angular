import { Component, inject, OnDestroy, OnInit } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { Subscription } from "rxjs"
import { APP_ROUTES, LAYOUT_ROUTES } from "@constants/route.constants"
import { StorageService } from "@shared/services/storage.service"
import { STORAGE_CONSTANTS } from "@constants/storage.constants"
import { UserData } from "@core/api/login/login-api.interface"

@Component({
 selector: "app-header",
 templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
 private readonly storageService = inject(StorageService)
 private readonly router = inject(Router)

 tabsList: TabInterface[] = [
  { name: "Home", link: "home" },
  { name: "Portfolio", link: "portfolio" },
  { name: "About", link: "about" },
  { name: "Contact Us", link: "contactus" }
 ]
 selectedTab: TabInterface | null = null

 // Mobile menu state
 mobileOpen = false

 // subscription to auto-close mobile menu on navigation
 private routerEventsSub?: Subscription
 private storageSubscription?: Subscription

 userData: UserData | null = null

 ngOnInit() {
  this.updateUserData()
  this.setSelectedTabFromUrl(this.router.url)

  this.routerEventsSub = this.router.events.subscribe((event) => {
   if (event instanceof NavigationEnd) {
    this.mobileOpen = false
    this.setSelectedTabFromUrl(event.urlAfterRedirects)
   }
  })

  this.storageSubscription = this.storageService.onStorageChanges().subscribe((event) => {
   if (event.key === STORAGE_CONSTANTS.token || event.key === '*') {
    this.updateUserData()
   }
  })
 }

 get userFullName(): string {
  if (!this.userData) return ""
  const fname = (this.userData.fname || "").trim()
  const lname = (this.userData.lname || "").trim()
  return [fname, lname].filter(Boolean).join(" ")
 }

 get userInitials(): string {
  if (!this.userData) return "U"
  const fname = (this.userData.fname || "").trim()
  const lname = (this.userData.lname || "").trim()
  const first = fname.charAt(0)
  const second = lname.charAt(0)
  return `${first}${second}`.toUpperCase() || "U"
 }

 toggleMobile() {
  this.mobileOpen = !this.mobileOpen
 }

 handleTabEvent(event: TabInterface): void {
  this.selectedTab = event
  this.navigateToRoute(event.link)
 }

 gotoLogin(): void {
  this.navigateToRoute(LAYOUT_ROUTES.login)
 }

 gotoSignup(): void {
  this.navigateToRoute(LAYOUT_ROUTES.signup)
 }

 logout(): void {
  this.storageService.removeItem(STORAGE_CONSTANTS.token)
  this.userData = null
  this.navigateToRoute(LAYOUT_ROUTES.login)
 }

 private updateUserData(): void {
  this.userData = this.storageService.getItem<UserData>(STORAGE_CONSTANTS.token)
 }

 private setSelectedTabFromUrl(url: string): void {
  const currentPath = url.split('/').pop() ?? ''
  this.selectedTab = this.tabsList.find(tab => tab.link === currentPath) ?? this.tabsList[0]
 }

 private navigateToRoute(link: string): void {
  this.mobileOpen = false
  this.router.navigate([APP_ROUTES.layout, link])
 }

 ngOnDestroy() {
  this.routerEventsSub?.unsubscribe()
  this.storageSubscription?.unsubscribe()
 }
}

/** Interfaces */
interface TabInterface {
 name: string;
 link: string;
}