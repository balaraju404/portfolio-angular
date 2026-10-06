import { Injectable, signal } from "@angular/core"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
 id: number
 message: string
 type: ToastType
 duration: number
}

@Injectable({ providedIn: "root" })
export class ToastService {
 private readonly _toasts = signal<Toast[]>([])

 readonly toasts = this._toasts.asReadonly()

 private nextId = 0

 success(message: string, duration = 3000): void {
  this.show(message, "success", duration)
 }

 error(message: string, duration = 5000): void {
  this.show(message, "error", duration)
 }

 warning(message: string, duration = 4000): void {
  this.show(message, "warning", duration)
 }

 info(message: string, duration = 3000): void {
  this.show(message, "info", duration)
 }

 show(message: string, type: ToastType = "info", duration = 3000): void {
  const toast: Toast = {
   id: ++this.nextId,
   message,
   type,
   duration,
  }

  this._toasts.update(toasts => [...toasts, toast])

  if (duration > 0) {
   setTimeout(() => this.dismiss(toast.id), duration)
  }
 }

 dismiss(id: number): void {
  this._toasts.update(toasts => toasts.filter(toast => toast.id !== id))
 }

 clear(): void {
  this._toasts.set([])
 }
}