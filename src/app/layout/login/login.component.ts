import { Component } from '@angular/core';
import { TextfieldComponent } from '../../shared/custom-textfield/textfield.component';

@Component({
 selector: 'app-login',
 imports: [TextfieldComponent],
 templateUrl: './login.component.html',
 styleUrls: []
})
export class LoginComponent {

 formData: any = this.initializeFormData()
 ngOnInit() {

 }
 initializeFormData() {
  return {
   login_name: "",
   password: ""
  }
 }
 onClickLogin() {
  console.log(this.formData);

 }
}