import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

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

  logonForm: FormGroup = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email
    ]),

    nickname: new FormControl("",[
      Validators.required,
      Validators.minLength(2)
    ]),

    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ]),

    re_password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ]),

    inviter: new FormControl("",[
      Validators.required,
      Validators.minLength(5)
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
    let url = '/api/user/logon';
    let data = this.logonForm.value
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
