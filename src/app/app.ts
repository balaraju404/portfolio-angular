import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header } from "./components/header/header"
import { Footer } from "./components/footer/footer"
import { LibToast } from "./shared/toast/toast"

@Component({
 imports: [RouterOutlet, Header, Footer, LibToast],
 selector: "app-root",
 templateUrl: "./app.html"
})
export class App { }