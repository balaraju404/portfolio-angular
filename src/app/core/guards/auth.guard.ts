import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { AuthStore } from "../../store/auth.store"
import { RouteService } from "../services/route.service"

export const authGuard: CanActivateFn = () => {
 const authStore = inject(AuthStore)
 const routeService = inject(RouteService)
 return authStore.isLoggedIn() ? true : routeService.loginUrl()
}