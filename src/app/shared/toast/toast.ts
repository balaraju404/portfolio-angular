import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { ToastService, ToastType } from "./toast.service"

@Component({
 selector: "lib-toast",
 templateUrl: "./toast.html",
 changeDetection: ChangeDetectionStrategy.OnPush,
 host: {
  class: "pointer-events-none fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3",
  "aria-live": "polite",
  "aria-atomic": "true"
 }
})
export class LibToast {
 readonly toastService = inject(ToastService)

 readonly toastClass: Record<ToastType, string> = {
  success: "border-green-200",
  error: "border-red-200",
  warning: "border-yellow-200",
  info: "border-blue-200"
 }

 readonly iconClass: Record<ToastType, string> = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  info: "bg-blue-100 text-blue-700"
 }

 readonly icons: Record<ToastType, string> = {
  success: "✓",
  error: "!",
  warning: "!",
  info: "i"
 }
}