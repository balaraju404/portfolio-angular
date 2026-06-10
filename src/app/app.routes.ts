import { Routes } from '@angular/router';
import { APP_ROUTES } from '@constants/route.constants';

export const routes: Routes = [
 { path: APP_ROUTES.app, pathMatch: "full", redirectTo: `/${APP_ROUTES.layout}` },
 { path: APP_ROUTES.layout, loadChildren: () => import("./layout/layout.routes").then(m => m.layoutRoutes) },
]