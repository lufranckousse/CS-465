import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { TripDataService } from './trip-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  getToken(): string { return this.storage.getItem('travlr-token') || ''; }
  saveToken(token: string): void { this.storage.setItem('travlr-token', token); }
  logout(): void { this.storage.removeItem('travlr-token'); this.router.navigate(['']); }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      this.logout();
      return false;
    }
  }

  getCurrentUser(): User | null {
    if (!this.isLoggedIn()) return null;
    const { email, name } = JSON.parse(atob(this.getToken().split('.')[1]));
    return { email, name } as User;
  }

  login(user: User, password: string) {
    return this.tripDataService.login(user, password);
  }

  register(user: User, password: string) {
    return this.tripDataService.register(user, password);
  }
}
