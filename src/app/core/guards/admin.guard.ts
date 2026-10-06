import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { AuthStore } from "../../store/auth.store"
import { RouteService } from "../services/route.service"
import { UserRoleEnum } from "../../apis/auth/auth-api.model"

export const adminGuard: CanActivateFn = () => {
 const authStore = inject(AuthStore)
 const routeService = inject(RouteService)

 const user = authStore.user()
 if (!user) return routeService.loginUrl()
 return user.role === UserRoleEnum.Admin ? true : routeService.homeUrl()
}