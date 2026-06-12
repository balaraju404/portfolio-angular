import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ToastService, ToastType } from '@shared/services/toast.service'

const TOAST_ICONS: Record<ToastType, string> = {
 success: '✓',
 error: '⚠',
 warning: '!',
 info: 'ℹ'
}

@Component({
 selector: 'app-toast',
 standalone: true,
 templateUrl: './toast.html',
 styleUrls: ['./toast.scss'],
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
 private readonly toastService = inject(ToastService)
 readonly toastList = this.toastService.toastList

 getIcon(type: ToastType): string {
  return TOAST_ICONS[type] ?? TOAST_ICONS.info
 }

 dismissToast(id: string): void {
  this.toastService.dismiss(id)
 }
}