import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
 selector: 'app-root',
 imports: [RouterOutlet, CommonModule],
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent {
 private http = inject(HttpClient);

 ngOnInit() {
 }

}
