import { Component, inject, OnDestroy } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { ButtonComponent } from "../../shared/button/button.component"
import { CommonModule } from "@angular/common"
import { Subscription } from "rxjs"

@Component({
 selector: "app-header",
 imports: [CommonModule, ButtonComponent],
 templateUrl: "./header.component.html",
 styleUrls: []
})
export class HeaderComponent implements OnDestroy {
 private readonly router = inject(Router)
 tabsList: any = [
  { "name": "Home", "link": "home" },
  { "name": "Portfolio", "link": "portfolio" },
  { "name": "About", "link": "about" },
  { "name": "Contact Us", "link": "contactus" },
 ]
 selectedTab: any = {}
 // Mobile menu state
 mobileOpen = false

 // subscription to auto-close mobile menu on navigation
 private routerEventsSub?: Subscription

 ngOnInit() {
  this.selectedTab = this.tabsList[0]

  // Close mobile menu automatically when navigation finishes
  this.routerEventsSub = this.router.events.subscribe((event) => {
   if (event instanceof NavigationEnd) {
    this.mobileOpen = false
   }
  })
 }

 // toggle helper (optional, template currently toggles property directly)
 toggleMobile() {
  this.mobileOpen = !this.mobileOpen
 }

 navigateToRoute(item: any) {
  this.selectedTab = item
  // ensure mobile menu closes after navigation
  this.mobileOpen = false
  this.router.navigate(["layout", item.link])
 }

 ngOnDestroy() {
  this.routerEventsSub?.unsubscribe()
 }
}