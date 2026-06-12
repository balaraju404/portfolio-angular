import { Injectable } from "@angular/core"
import { environment } from "../../../environments/environment"

@Injectable({ providedIn: "root" })
export class Constants {

 static readonly API_URL: string = environment.apiUrl

 /** API Path */
 static getApiPath(path: string): string {
  return `${this.API_URL}/${path}`
 }
}