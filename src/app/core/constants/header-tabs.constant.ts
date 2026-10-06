import { APP_ROUTES } from "./route.constant"

export const HEADER_TABS = [
 {
  label: "Home",
  route: APP_ROUTES.HOME
 },
 {
  label: "Templates",
  route: APP_ROUTES.TEMPLATES
 },
 {
  label: "My Projects",
  route: APP_ROUTES.PROJECTS
 },
 {
  label: "About",
  route: APP_ROUTES.ABOUT
 }
] as const