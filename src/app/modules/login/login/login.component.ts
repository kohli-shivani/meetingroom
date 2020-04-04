import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@core/services/login.service';
import { environment as env } from '@env/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private router: Router,private formBuilder: FormBuilder,private _loginapi: LoginService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9]{3,}')]],
      password: ['',Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this._loginapi.checkUser(this.f.username.value,this.f.password.value).subscribe((data:any) => {
        if(data && data.length>0){
          localStorage.setItem("username",this.f.username.value)
          localStorage.setItem("isLoggedIn","true")
          this.router.navigateByUrl("/dashboard");
        }else{
          alert("Please enter valid credentials")
        }
      },err => {
       alert("Something went wrong,please try again later!");
        console.log("inside catch error",err);
      });
     

  }

}
