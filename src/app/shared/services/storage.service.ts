import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
 setItem<T>(key: string, value: T): void {
  try {
   localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
   console.error(`Failed to save "${key}" to localStorage`, error);
  }
 }

 getItem<T>(key: string): T | null {
  try {
   const value = localStorage.getItem(key);
   return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
   console.error(`Failed to read "${key}" from localStorage`, error);
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