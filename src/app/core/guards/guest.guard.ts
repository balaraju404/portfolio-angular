import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { AuthStore } from "../../store/auth.store"
import { RouteService } from "../services/route.service"

export const guestGuard: CanActivateFn = () => {
 const authStore = inject(AuthStore)
 const routeService = inject(RouteService)
 return authStore.isLoggedIn() ? routeService.homeUrl() : true
}