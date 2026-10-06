import { inject, Injectable } from "@angular/core"
import { NavigationEnd, Router, UrlTree } from "@angular/router"
import { filter, map, startWith } from "rxjs"
import { APP_ROUTES } from "../constants/route.constant"

@Injectable({ providedIn: "root" })
export class RouteService {
 private readonly router = inject(Router)

 /**
  * Current active route.
  * Updates automatically whenever navigation finishes.
  */
 readonly currentRoute$ = this.router.events.pipe(
  filter((event) => event instanceof NavigationEnd),
  map((event) => event.urlAfterRedirects),
  startWith(this.router.url)
 )

 home(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.HOME])
 }

 login(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.LOGIN])
 }

 register(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.REGISTER])
 }

 forgotPassword(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.FORGOT_PASSWORD])
 }

 profile(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.PROFILE])
 }

 templates(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.TEMPLATES])
 }

 projects(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.PROJECTS])
 }

 about(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.ABOUT])
 }

 sections(): Promise<boolean> {
  return this.router.navigate(["/", APP_ROUTES.SECTIONS])
 }

 navigateTo(path: string): Promise<boolean> {
  return this.router.navigate(["/", path])
 }

 /**
  * Check whether a route is currently active.
  */
 isActive(path: string): boolean {
  return this.router.url === `/${path}`
 }

 /**
  * Get the current URL.
  */
 get currentUrl(): string {
  return this.router.url
 }

 back(): void {
  window.history.back()
 }

 loginUrl(): UrlTree {
  return this.router.createUrlTree(["/", APP_ROUTES.LOGIN])
 }

 homeUrl(): UrlTree {
  return this.router.createUrlTree(["/", APP_ROUTES.HOME])
 }
}