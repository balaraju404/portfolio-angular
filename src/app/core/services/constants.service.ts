import { Injectable } from "@angular/core"
import { environment } from "../../../environments/environment"

@Injectable({ providedIn: "root" })
export class Constants {

 static readonly API_URL: string = environment.apiUrl
 static readonly PORTFOLIO_URL: string = environment.portfolioUrl

 /** API Path */
 static getApiPath(path: string): string {
  return `${this.API_URL}/${path}`
 }
}