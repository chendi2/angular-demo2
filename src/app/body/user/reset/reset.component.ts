import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  isError:boolean = false
  errorMessage:string = ""
  isLoading:boolean = false

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  resetForm: FormGroup = new FormGroup({
    username: new FormControl("",[
      Validators.required,
      Validators.email
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

  onSubmit() {
    this.isLoading = true
    if (this.resetForm.valid) {
      let url = '/api/user/reset';
      let params = this.resetForm.value
      const httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
      };
      this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=>{
        this.isLoading = false
      })
    }else {
      Object.values(this.resetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isLoading = false
  }

}
