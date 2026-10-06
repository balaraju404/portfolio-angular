import { Routes } from "@angular/router"
import { APP_ROUTES } from "./core/constants/route.constant"

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
  loadComponent: () => import("./pages/login/login").then((m) => m.Login)
 },
 {
  path: APP_ROUTES.REGISTER,
  loadComponent: () => import("./pages/register/register").then((m) => m.Register)
 },
 {
  path: APP_ROUTES.PROFILE,
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
 }
]