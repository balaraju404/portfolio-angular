import { Component, inject, OnDestroy, OnInit } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { NgClass } from "@angular/common"
import { Subscription } from "rxjs"
import { APP_ROUTES, LAYOUT_ROUTES } from "@constants/route.constants"
import { Button } from "@shared/components/button/button"
import { StorageService } from "@shared/services/storage.service"
import { STORAGE_CONSTANTS } from "@constants/storage.constants"
import { UserData } from "@core/api/login/login-api.interface"

@Component({
 selector: "app-header",
 imports: [Button, NgClass],
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
  this.userData = this.storageService.getItem<UserData>(STORAGE_CONSTANTS.token)
  this.selectedTab = this.tabsList[0]

  // Close mobile menu automatically when navigation finishes
  this.routerEventsSub = this.router.events.subscribe((event) => {
   if (event instanceof NavigationEnd) {
    this.mobileOpen = false
   }
  })

  this.storageSubscription = this.storageService.onStorageChanges().subscribe((event) => {
   if (event.key === STORAGE_CONSTANTS.token || event.key === '*') {
    this.userData = this.storageService.getItem<UserData>(STORAGE_CONSTANTS.token)
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

 // toggle helper (optional, template currently toggles property directly)
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

 private navigateToRoute(link: string): void {
  // ensure mobile menu closes after navigation
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