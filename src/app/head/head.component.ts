import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  isLogin:Boolean  = false;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {}


  ngDoCheck(): void {
    this.isLogin = this.authService.isLoggedIn()
  }


  logout_test():void {
    this.authService.logout()
    this.router.navigate(['home'])
    console.log(this.authService.isLoggedIn())
  }

}
