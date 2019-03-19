import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthService}  from '../auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Arth Lab Supplies';
  unAuthUser :boolean = false;
  loginFrom = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  
  constructor(private fb: FormBuilder, private authService: AuthService, private ngxService:NgxUiLoaderService) { 
    this.loginFrom = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(loginVals){
    this.authService.validateUser(loginVals.email, loginVals.password).then((success)=>{
     this.unAuthUser = false;
     console.log('Successful login ', success);
    },
    (error) =>{
      this.unAuthUser = true;
      console.log('Error in login ', error);
    }
    )
  }

}
