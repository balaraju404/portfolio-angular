import { computed, inject, Injectable, signal } from "@angular/core"

import { LoginData, User } from "../apis/auth/auth-api.model"
import { StorageService } from "../core/services/storage.service"

@Injectable({ providedIn: "root" })
export class AuthStore {

 private readonly storageService = inject(StorageService)

 private readonly authKey = "auth_data"

 private readonly _authData = signal<LoginData | null>(this.storageService.get<LoginData>(this.authKey))

 readonly authData = this._authData.asReadonly()

 readonly user = computed<User | null>(() => this._authData()?.user ?? null)

 readonly token = computed<string | null>(() => this._authData()?.token ?? null)

 readonly isLoggedIn = computed(() => !!this._authData()?.token && !!this._authData()?.user)

 login(data: LoginData): void {
  this._authData.set(data)
  this.persistAuthData(data)
 }

 logout(): void {
  this._authData.set(null)
  this.storageService.remove(this.authKey)
 }

 setUser(user: User): void {
  const currentData = this._authData()
  if (!currentData) return
  this.persistAuthData({ ...currentData, user })
 }

 setToken(token: string): void {
  const currentData = this._authData()
  if (!currentData) return
  this.persistAuthData({ ...currentData, token })
 }

 private persistAuthData(data: LoginData): void {
  this._authData.set(data)
  this.storageService.set(this.authKey, data)
 }
}