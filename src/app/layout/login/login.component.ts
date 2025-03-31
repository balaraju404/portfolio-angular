import { Component } from '@angular/core';
import { ButtonModel, TextfieldModel } from '@balaraju404/custom-components';

@Component({
 selector: 'app-login',
 imports: [],
 templateUrl: './login.component.html',
 styleUrls: []
})
export class LoginComponent {
 tf_mdl_username!: TextfieldModel
 tf_mdl_pwd!: TextfieldModel
 btn_mdl_login!: ButtonModel
 ngOnInit() {
  this.setupFields()
 }
 setupFields() {
  this.tf_mdl_username = new TextfieldModel(1, "User Name")
  this.tf_mdl_pwd = new TextfieldModel(2, "Password")
  this.btn_mdl_login = new ButtonModel(3, "Login")
 }
}
