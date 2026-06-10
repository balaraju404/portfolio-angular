import { Routes } from "@angular/router";
import { LAYOUT_ROUTES } from "@constants/route.constants";

export const layoutRoutes: Routes = [
 {
  path: LAYOUT_ROUTES.base, loadComponent: () => import('./layout.component').then(m => m.LayoutComponent), children: [
   { path: LAYOUT_ROUTES.login, loadComponent: () => import("../pages/login/login").then(m => m.Login) },
   { path: LAYOUT_ROUTES.signup, loadComponent: () => import("../pages/signup/signup").then(m => m.Signup) },
   { path: LAYOUT_ROUTES.forgor_password, loadComponent: () => import("../pages/forgot-password/forgot-password").then(m => m.ForgotPassword) },
   { path: LAYOUT_ROUTES.home, loadComponent: () => import("../pages/home/home").then(m => m.Home) },
   { path: LAYOUT_ROUTES.portfolio, loadComponent: () => import("../pages/home/home").then(m => m.Home) },
   { path: LAYOUT_ROUTES.about, loadComponent: () => import("../pages/about/about").then(m => m.About) },
   { path: LAYOUT_ROUTES.contact_us, loadComponent: () => import("../pages/contact-us/contact-us").then(m => m.ContactUs) },
  ]
 }
]