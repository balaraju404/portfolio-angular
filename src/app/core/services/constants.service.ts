import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class Constants {

 static readonly API_URL: string = "http://localhost:3000"
 // static readonly API_URL: string = "https://portfolio-node-by-balaraju.vercel.app"

 static readonly GET_PORTFOLIO_URL = `${Constants.API_URL}portfolio/get`

 /** API Path */
 static getApiPath(path: string): string {
  return `${Constants.API_URL}/${path}`
 }
}