import {
 computed,
 effect,
 inject,
} from '@angular/core';

import {
 patchState,
 signalStore,
 withComputed,
 withHooks,
 withMethods,
 withState,
} from '@ngrx/signals';

import { StorageService } from '@shared/services/storage.service';
import { STORAGE_CONSTANTS } from '@constants/storage.constants';

import { UserData } from '@core/api/login/login-api.interface';

interface UserState {
 user: UserData | null;
 loading: boolean;
 error: string | null;
}

const initialState: UserState = {
 user: null,
 loading: false,
 error: null,
};

export const UserStore = signalStore(
 { providedIn: 'root' },

 withState(initialState),

 withComputed(({ user }) => ({
  isLoggedIn: computed(() => user() !== null),

  displayName: computed(() => {
   const currentUser = user();

   if (!currentUser) {
    return 'Guest';
   }

   return [
    currentUser.fname,
    currentUser.lname,
   ]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(' ');
  }),

  initials: computed(() => {
   const currentUser = user();

   if (!currentUser) {
    return 'U';
   }

   return (
    `${currentUser.fname?.trim().charAt(0) ?? ''}` +
    `${currentUser.lname?.trim().charAt(0) ?? ''}`
   ).toUpperCase() || 'U';
  }),

  isAdmin: computed(() => user()?.is_admin === 1),

  userId: computed(() => user()?.user_id ?? null),
 })),

 withMethods((store) => ({
  setUser(user: UserData): void {
   patchState(store, {
    user,
    loading: false,
    error: null,
   });
  },

  clearUser(): void {
   patchState(store, {
    user: null,
    loading: false,
    error: null,
   });
  },

  setLoading(loading: boolean): void {
   patchState(store, { loading });
  },

  setError(error: string | null): void {
   patchState(store, { error });
  },
 })),

 withHooks({
  onInit(store) {
   const storage = inject(StorageService);
   const savedUser = storage.getItem<UserData>(STORAGE_CONSTANTS.user);

   if (savedUser) {
    patchState(store, { user: savedUser });
   }

   effect(() => {
    const currentUser = store.user();
    if (currentUser) {
     storage.setItem(STORAGE_CONSTANTS.user, currentUser);
    } else {
     storage.removeItem(STORAGE_CONSTANTS.user);
    }
   });
  },
 })
);