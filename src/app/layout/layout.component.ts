import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
 selector: 'app-layout',
 imports: [HeaderComponent, FooterComponent],
 templateUrl: './layout.component.html',
 styleUrls: []
})
export class LayoutComponent {

}
