import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelperService {

 static scrollToSection(id: any) {
  const element = document.getElementById(id)
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
 }
}