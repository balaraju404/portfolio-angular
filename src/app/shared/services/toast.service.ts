import { Injectable, signal, Signal } from '@angular/core'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastAlert {
 message: string
 type: ToastType
 id: string
}

@Injectable({ providedIn: 'root' })
export class ToastService {
 private readonly _toasts = signal<ToastAlert[]>([])
 readonly toastList: Signal<ToastAlert[]> = this._toasts
 private readonly defaultDuration = 4000

 private createToast(message: string, type: ToastType): ToastAlert {
  return {
   message,
   type,
   id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  }
 }

 show(message: string, type: ToastType = 'success', duration = this.defaultDuration): void {
  const toast = this.createToast(message, type)
  this._toasts.update((current) => [...current, toast])
  setTimeout(() => this.dismiss(toast.id), duration)
 }

 success(message: string, duration = this.defaultDuration): void {
  this.show(message, 'success', duration)
 }

 error(message: string, duration = this.defaultDuration): void {
  this.show(message, 'error', duration)
 }

 info(message: string, duration = this.defaultDuration): void {
  this.show(message, 'info', duration)
 }

 warning(message: string, duration = this.defaultDuration): void {
  this.show(message, 'warning', duration)
 }

 dismiss(id: string): void {
  this._toasts.update((current) => current.filter((toast) => toast.id !== id))
 }

 clear(): void {
  this._toasts.set([])
 }
}