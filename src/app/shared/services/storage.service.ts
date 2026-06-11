import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
 private readonly storageChanges = new Subject<{ key: string; value: unknown | null }>();

 setItem(key: string, value: unknown): void {
  const encoded = btoa(JSON.stringify(value));
  localStorage.setItem(key, encoded);
  this.storageChanges.next({ key, value });
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
  this.storageChanges.next({ key, value: null });
 }

 clear(): void {
  localStorage.clear();
  this.storageChanges.next({ key: '*', value: null });
 }

 onStorageChanges(): Observable<{ key: string; value: unknown | null }> {
  return this.storageChanges.asObservable();
 }
}