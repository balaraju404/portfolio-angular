import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgClass } from '@angular/common'
import { ToastService } from '@shared/services/toast.service'

@Component({
 selector: 'app-toast',
 standalone: true,
 imports: [NgClass],
 templateUrl: './toast.html',
 styleUrls: ['./toast.scss'],
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
 private readonly toastService = inject(ToastService)
 readonly toastList = this.toastService.toastList

 getIcon(type: string): string {
  switch (type) {
   case 'success':
    return '✓'
   case 'error':
    return '⚠'
   case 'warning':
    return '!'
   default:
    return 'ℹ'
  }
 }

 dismissToast(id: string): void {
  this.toastService.dismiss(id)
 }
}