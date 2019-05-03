import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.component.html',
  styleUrls: ['./expenses-detail.component.css']
})
export class ExpensesDetailComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }

  addExpenses(){
    this.router.navigate(['/add-expenses']);
  }

  selectChangeMonth(event){
    
  }
}
