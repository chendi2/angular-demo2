import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isError:boolean = false
  isLoading:boolean = false
  errorMessage:string = ""

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

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
    remember: new FormControl(false)
  })


  transformRequest(data:any) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  };

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true
      let url = '/api/user/login';
      let params = this.loginForm.value
      console.log(params);
      const httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
      };
      this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=>{
        this.isLoading = false
        console.log(res);
        if (res.code == 200){
          this.authService.login(res.data)
          this.messageService.create('success', `登陆成功！`)
          this.location.back();
        }else if (res.code == 400){
          this.isError = true
          this.errorMessage = res.message
        }
      })
    }else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isError = false
  }

}
