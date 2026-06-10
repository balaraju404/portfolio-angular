import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class StorageService {

 setItem(key: string, value: unknown): void {
  const encoded = btoa(JSON.stringify(value));
  localStorage.setItem(key, encoded);
 }

 getItem<T>(key: string): T | null {
  const encoded = localStorage.getItem(key);

  if (!encoded) {
   return null;
  }

  try {
   const decoded = atob(encoded);
   return JSON.parse(decoded) as T;
  } catch {
   return null;
  }
 }

 removeItem(key: string): void {
  localStorage.removeItem(key);
 }

 clear(): void {
  localStorage.clear();
 }
}