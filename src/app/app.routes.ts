import { Routes } from "@angular/router"
import { APP_ROUTES } from "./core/constants/route.constant"
import { guestGuard } from "./core/guards/guest.guard"
import { authGuard } from "./core/guards/auth.guard"
import { adminGuard } from "./core/guards/admin.guard"

export const routes: Routes = [
 {
  path: "",
  redirectTo: APP_ROUTES.HOME,
  pathMatch: "full"
 },
 {
  path: APP_ROUTES.HOME,
  loadComponent: () => import("./pages/home/home").then((m) => m.Home)
 },
 {
  path: APP_ROUTES.LOGIN,
  canActivate: [guestGuard],
  loadComponent: () => import("./pages/login/login").then((m) => m.Login)
 },
 {
  path: APP_ROUTES.REGISTER,
  canActivate: [guestGuard],
  loadComponent: () => import("./pages/register/register").then((m) => m.Register)
 },
 {
  path: APP_ROUTES.FORGOT_PASSWORD,
  canActivate: [guestGuard],
  loadComponent: () => import("./pages/forgot-password/forgot-password").then((m) => m.ForgotPassword)
 },
 {
  path: APP_ROUTES.PROFILE,
  canActivate: [authGuard],
  loadComponent: () => import("./pages/profile/profile").then((m) => m.Profile)
 },
 {
  path: APP_ROUTES.TEMPLATES,
  loadComponent: () => import("./pages/templates/templates").then((m) => m.Templates)
 },
 {
  path: APP_ROUTES.PROJECTS,
  loadComponent: () => import("./pages/my-projects/my-projects").then((m) => m.MyProjects)
 },
 {
  path: APP_ROUTES.ABOUT,
  loadComponent: () => import("./pages/about/about").then((m) => m.About)
 },

 /** Admin Pages */
 {
  path: APP_ROUTES.SECTIONS,
  canActivate: [adminGuard],
  loadComponent: () => import("./pages/sections/sections").then((m) => m.Sections)
 }
]