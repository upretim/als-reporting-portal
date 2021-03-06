import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {multiFilter} from '../../utils/util.functions';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.component.html',
  styleUrls: ['./expenses-detail.component.css']
})
export class ExpensesDetailComponent implements OnInit {
  filteredTravelData = [];
  allTravelData = [];
  filterObj: any = {
    name: "",
    month: ""
  }
  subscription: Subscription;

  constructor(private dataService: DataService,
              private router: Router, 
              private ngxService: NgxUiLoaderService
              ) { }

  ngOnInit() {
    let month = new Date().getMonth()+1;
    if(month<10){
      this.filterObj.month = "0"+ month;
    }
    else{
      this.filterObj.month = "" + month
    }
    
    if (this.dataService.travelData){
      this.allTravelData = this.dataService.travelData;
      this.filteredTravelData = multiFilter( _.orderBy(this.dataService.travelData, ['date'],['desc']), this.filterObj);
    }
  }

  ngOnDestroy(): void {
  }

  addExpenses(){
    this.router.navigate(['/add-travel']);
  }

  selectChangeMonth(event){
    this.filterObj.month = event.currentTarget.value;
    let tempData = _.orderBy(this.allTravelData, ['date'],['desc']);
    this.filteredTravelData = multiFilter(tempData, this.filterObj);
  }
  nameChange(event){
    this.filterObj.name = event.currentTarget.value;
    let tempData = _.orderBy(this.allTravelData, ['date'],['desc']);
    this.filteredTravelData = multiFilter(tempData, this.filterObj);
  }
}
