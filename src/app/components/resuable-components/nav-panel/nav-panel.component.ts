import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.css']
})
export class NavPanelComponent implements OnInit {
  
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  gotoHome(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  gotoReceivableSummary(){
    this.router.navigate(['/summary']);
  }

  plsummary(){
    this.router.navigate(['/PLStatus']);
  }

  showExpenses(){
    this.router.navigate(['/expense-details']);
  }

}
