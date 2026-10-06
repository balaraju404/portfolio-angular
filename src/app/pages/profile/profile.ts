import { Component, inject, signal } from "@angular/core"
import { AuthStore } from "../../store/auth.store"

@Component({
 selector: "app-profile",
 templateUrl: "./profile.html"
})
export class Profile {
 private readonly authStore = inject(AuthStore)

 readonly name = signal(this.authStore.user()?.name ?? "")
 readonly email = signal(this.authStore.user()?.email ?? "")

 readonly isUpdating = signal(false)

 updateProfile(event: SubmitEvent): void {
  event.preventDefault()
  if (this.isUpdating()) return

  this.isUpdating.set(true)

 }
}