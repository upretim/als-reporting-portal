import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthService}  from '../auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { ToastrService } from 'ngx-toastr';

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

  
  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private ngxService:NgxUiLoaderService) { 
    this.loginFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(loginVals){
    this.authService.validateUser(loginVals.email, loginVals.password)
  }

}
