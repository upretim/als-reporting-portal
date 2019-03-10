import { Component, OnInit } from '@angular/core';
import {AuthService}  from '../auth.service';
import { Router } from  "@angular/router";
import { Observable } from  "rxjs";
import { HttpClient } from  "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  addInvoice(){
    this.router.navigate(['/invoice']);
  }

}
