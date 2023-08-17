import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {User} from './../../pojo/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    if (this.getToken()) {
      this.loggedIn = true;
    }
  }

  login(token:string, isRemember:boolean) {
    this.loggedIn = true;
    if (isRemember){
      this.storageService.setLocalStorage('token', token);
    }else{
      this.storageService.setSessionStorage('token', token);
    }
  }

  logout() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getToken(){
    if (this.storageService.getSessionStorage('token')){
      return this.storageService.getSessionStorage('token')
    }

    if (this.storageService.getLocalStorage('token')){
      return this.storageService.getLocalStorage('token')
    }

    return null
  }

  getEmail(){
    let token = this.getToken()
    if (token){
      return JSON.parse(decodeURIComponent(encodeURI(window.atob(token.split(".")[1])))).sub
    }else {
      return null
    }
  }

  updateToken(token:string){
    if (this.storageService.getLocalStorage('token')){
      this.storageService.setLocalStorage('token',token)
    }
    if (this.storageService.getSessionStorage('token')){
      this.storageService.setSessionStorage('token',token)
    }
  }

}
