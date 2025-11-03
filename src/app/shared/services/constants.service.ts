import { Injectable } from "@angular/core"

@Injectable({
 providedIn: "root"
})
export class Constants {

 static readonly API_URL: string = "http://localhost:3000/"
 // static readonly API_URL: string = "https://portfolio-node-by-balaraju.vercel.app/"

 static readonly LOGIN_CHECK_URL = `${Constants.API_URL}login/check`
 static readonly GET_PORTFOLIO_URL = `${Constants.API_URL}portfolio/get`

 static readonly LS_TOKEN_KEY = "ls_token"
}