import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: "", pathMatch: "full", redirectTo: "/login" },
 { path: "login", loadComponent: () => import("./login/login.component").then(m => m.LoginComponent) },
 { path: "layout", loadChildren: () => import("./layout/layout.routes").then(m => m.layoutRoutes) },

];
