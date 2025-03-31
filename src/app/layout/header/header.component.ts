import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ButtonModel } from '@balaraju404/custom-components';

@Component({
 selector: 'app-header',
 imports: [ButtonComponent],
 templateUrl: './header.component.html',
 styleUrls: []
})
export class HeaderComponent {
 private readonly router = inject(Router)
 tabsList: any = [
  { "name": "Home", "link": "home" },
  { "name": "Portfolio", "link": "portfolio" },
  { "name": "About", "link": "about" },
  { "name": "Contact Us", "link": "contactus" },
 ]
 selectedTab: any = {}
 btn_mdl_login!: ButtonModel
 ngOnInit() {
  this.selectedTab = this.tabsList[0];
  this.setupFields()
 }
 setupFields() {
  this.btn_mdl_login = new ButtonModel(1, "Login");
 }
 navigateToRoute(item: any) {
  this.selectedTab = item;
  this.router.navigate(["layout", item.link])

 }
}
