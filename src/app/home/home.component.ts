import { Component, OnInit } from '@angular/core';
import {AuthService}  from '../auth.service';
import { Router } from  "@angular/router";
import {DataService} from '../data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  addInvoice(){
    this.router.navigate(['/invoice']);
  }

}
