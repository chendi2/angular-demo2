import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imgSrc:any
  ver_key:any
  ver_code:string = ""
  isError:boolean = false
  errorMessage:string = ""

  constructor(
    private http: HttpClient,
    private authService:AuthService
  ) {
    this.getImgSrc()
  }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ]),
    ver_code: new FormControl("",[
      Validators.required,
      Validators.minLength(5)
    ])
  })

  transformRequest(data:any) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  };

  getImgSrc(){
    this.ver_key = this.getRandomString();
    this.imgSrc =  '/api/user/captcha/' + this.ver_key
  }

  getRandomString() {
    return formatDate(Date.now(), 'mmssSSS','en-US') + Number((Math.random() * 100).toFixed(0))
  }

  onSubmit() {
    let url = '/api/user/login';
    let data = this.loginForm.value
    let added_data = {"ver_key":this.ver_key}
    let params = Object.assign({}, data, added_data);
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
    };
    this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=>{
      console.log(res);
      if (res.code == 200){
        this.isError = false
        this.authService.login(res.data)
      }else if (res.code == 400){
        this.getImgSrc()
        this.isError = true
        this.errorMessage = res.message
      }
    })
  }
}
