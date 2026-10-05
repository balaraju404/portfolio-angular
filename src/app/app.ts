import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
 imports: [RouterOutlet, Header, Footer],
 selector: 'app-root',
 templateUrl: './app.html',
})
export class App { }