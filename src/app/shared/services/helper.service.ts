import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
 providedIn: 'root'
})
export class HelperService {
 private sanitizer = inject(DomSanitizer)

 static scrollToSection(id: any) {
  const element = document.getElementById(id)
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
 }



















 /**
  * Capitalize the first letter of a string.
  */
 capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
 }

 /**
  * Format a Date (or date-string/number) to YYYY-MM-DD or a custom separator.
  */
 formatDate(input: Date | string | number, sep = '-'): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return [yyyy, mm, dd].join(sep);
 }

 /**
  * Generate a RFC4122 version 4 UUID (uses crypto if available).
  */
 generateUuid(): string {
  if (typeof crypto !== 'undefined' && (crypto as any).getRandomValues) {
   const buf = new Uint8Array(16);
   (crypto as any).getRandomValues(buf);
   // adapt to RFC4122 version 4
   buf[6] = (buf[6] & 0x0f) | 0x40;
   buf[8] = (buf[8] & 0x3f) | 0x80;
   const hex = Array.from(buf).map(b => b.toString(16).padStart(2, '0'));
   return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
  }
  // fallback
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
 }

 /**
  * Debounce wrapper: returns a function that delays invoking fn until after wait ms have elapsed.
  */
 debounce<T extends (...args: any[]) => any>(fn: T, wait = 300): (...args: Parameters<T>) => void {
  let timer: any = null;
  return (...args: Parameters<T>) => {
   if (timer) clearTimeout(timer);
   timer = setTimeout(() => fn(...args), wait);
  };
 }

 /**
  * Throttle wrapper: returns a function that invokes fn at most once every limit ms.
  */
 throttle<T extends (...args: any[]) => any>(fn: T, limit = 200): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
   const now = Date.now();
   if (now - lastCall >= limit) {
    lastCall = now;
    fn(...args);
   }
  };
 }

 /**
  * Clamp a number between min and max.
  */
 clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
 }

 /**
  * Open an external link in a new tab safely.
  */
 openExternalLink(url: string, target = '_blank'): void {
  const win = window.open(url, target);
  if (win) win.opener = null;
 }

 /**
  * Download a given text/blob as a file with the given filename.
  */
 downloadFile(content: string | Blob, filename = 'download.txt', type?: string): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: type ?? 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
 }

 /**
  * Copy text to clipboard. Returns a Promise that resolves to true on success.
  */
 async copyToClipboard(text: string): Promise<boolean> {
  try {
   if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
   }
   const textarea = document.createElement('textarea');
   textarea.value = text;
   textarea.style.position = 'fixed';
   textarea.style.left = '-9999px';
   document.body.appendChild(textarea);
   textarea.select();
   const ok = document.execCommand('copy');
   textarea.remove();
   return ok;
  } catch {
   return false;
  }
 }

 /**
  * Basic device check for mobile.
  */
 isMobile(): boolean {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 }

 /**
  * Local storage helpers (safe wrappers).
  */
 setLocal<T = any>(key: string, value: T): void {
  try {
   localStorage.setItem(key, JSON.stringify(value));
  } catch { }
 }

 getLocal<T = any>(key: string): T | null {
  try {
   const v = localStorage.getItem(key);
   return v ? (JSON.parse(v) as T) : null;
  } catch {
   return null;
  }
 }

 removeLocal(key: string): void {
  try {
   localStorage.removeItem(key);
  } catch { }
 }

 /**
  * Get query param from current URL.
  */
 getQueryParam(name: string): string | null {
  try {
   return new URL(window.location.href).searchParams.get(name);
  } catch {
   return null;
  }
 }

 /**
  * Sanitize HTML for safe binding in templates.
  */
 sanitizeHtml(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
 }
}