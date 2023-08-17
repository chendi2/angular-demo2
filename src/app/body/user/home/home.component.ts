import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../../pojo/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User = {
    email: '',
    avatar: '',
    balance: 0,
    flag: 0,
    isStudent: 0,
    uid: 0,
    nickname:''
  }
  constructor(
    private http: HttpClient,
    private authService:AuthService
  ) { }

  transformRequest(data:any) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  };

  ngOnInit(): void {
    let url = '/api/user/info';
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
    };
    this.http.post(url,this.transformRequest(
      {
        "username": this.authService.getEmail()
      }
    ),httpOptions).subscribe((res:any)=>{
      if (res.code == 200){
        console.log(res.data)
        this.user = res.data
      }else if (res.code == 400){
        console.log("error")
      }
    })
  }
}
