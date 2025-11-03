import { Injectable } from '@angular/core'

@Injectable({
 providedIn: 'root'
})
export class LSHelperService {

 static setItem(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
 }
 static getItem(key: string) {
  return localStorage.getItem(key)
 }
 static removeItem(key: string) {
  localStorage.removeItem(key)
 }
 static clearAll() {
  localStorage.clear()
 }
}