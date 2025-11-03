import { Component, inject } from "@angular/core"
import { TextfieldComponent } from "../../shared/textfield/textfield.component"
import { ButtonComponent } from "../../shared/button/button.component"
import { ApiHandlingService } from "../../shared/services/api-handling.service"
import { Constants } from "../../shared/services/constants.service"
import { LSHelperService } from "../../shared/services/ls-helper.service"
import { Router } from "@angular/router"

@Component({
 selector: "app-login",
 imports: [TextfieldComponent, ButtonComponent],
 templateUrl: "./login.component.html",
 styleUrls: []
})
export class LoginComponent {
 private readonly apiService = inject(ApiHandlingService)
 private readonly router = inject(Router)

 formData: any = this.initializeFormData()
 ngOnInit() {

 }
 initializeFormData() {
  return {
   login_name: "",
   password: ""
  }
 }
 checkValidations() {
  let msg = ""
  const login_name = (this.formData.login_name || "").trim()
  const password = (this.formData.password || "").trim()

  if (!login_name) msg = "Please enter login name"
  else if (!password) msg = "Please enter password"

  if (msg.length) {
   alert(msg)
   return
  }
  this.checkLogin()
 }
 checkLogin() {
  this.apiService.post(Constants.LOGIN_CHECK_URL, this.formData).subscribe({
   next: (res: any) => {
    if (res["status"]) {
     alert(res["msg"])
     const data = res["data"]
     this.hanldeLoginSucess(data)
    }
   }, error: err => {
    alert(err)
   }
  })
 }
 hanldeLoginSucess(data: any) {
  LSHelperService.setItem(Constants.LS_TOKEN_KEY, data)
  this.router.navigate(["layout/home"])
 }
}