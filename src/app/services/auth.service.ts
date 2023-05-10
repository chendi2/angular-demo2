import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
    }
  }

  login(token:string) {
    this.loggedIn = true;
    this.storageService.setLocalStorage('token', token);
    //this.router.navigateByUrl("");
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}
