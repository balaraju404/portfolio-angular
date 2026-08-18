import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { LAYOUT_ROUTES } from '@constants/route.constants';
import { UserStore } from 'src/app/store/user.store';
import { NavigationService } from '@shared/services/navigation.service';

interface TabInterface {
 name: string;
 link: string;
}

@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
})
export class HeaderComponent {
 private readonly router = inject(Router);
 readonly navigation = inject(NavigationService);
 readonly userStore = inject(UserStore);

 readonly tabsList: TabInterface[] = [
  { name: 'Home', link: LAYOUT_ROUTES.home },
  { name: 'Portfolio', link: LAYOUT_ROUTES.portfolio },
  { name: 'About', link: LAYOUT_ROUTES.about },
  { name: 'Contact Us', link: LAYOUT_ROUTES.contact_us },
 ];

 mobileOpen = false;

 private readonly currentUrl = toSignal(
  this.router.events.pipe(
   filter((event): event is NavigationEnd => event instanceof NavigationEnd),
   map((event) => event.urlAfterRedirects),
   startWith(this.router.url)
  ),
  { initialValue: this.router.url }
 );

 readonly selectedTab = computed(() => {
  const currentPath = this.currentUrl().split('/').filter(Boolean).pop() ?? '';
  return (this.tabsList.find((tab) => tab.link === currentPath) ?? this.tabsList[0]);
 });

 toggleMobile(): void {
  this.mobileOpen = !this.mobileOpen;
 }

 handleTabEvent(tab: TabInterface): void {
  this.navigateToRoute(tab.link);
 }

 logout(): void {
  this.userStore.clearUser();
  this.navigation.goToLogin()
 }

 private navigateToRoute(link: string): void {
  this.mobileOpen = false;
  this.navigation.layoutRoute(link);
 }
}