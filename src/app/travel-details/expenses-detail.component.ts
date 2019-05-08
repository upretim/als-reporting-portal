import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {multiFilter} from '../utils/util.functions';

@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.component.html',
  styleUrls: ['./expenses-detail.component.css']
})
export class ExpensesDetailComponent implements OnInit {

  filteredTravelData = [];
  allTravelData = [];
  filterObj: any = {
  }

  constructor(private dataService: DataService, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.dataService.getDataFromFireBase('TravelData').subscribe((response)=>{
      console.log('Travel Data is ', response);
      this.allTravelData = response.map(item => {
        return item.payload.doc.data();
      });
      this.filteredTravelData  = this.allTravelData;
      console.log('Travel Data is ', this.filteredTravelData);
    },
    (error)=>{
      console.log('Expenses Data is ', error);
    })
  }

  addExpenses(){
    this.router.navigate(['/add-travel']);
  }

  selectChangeMonth(event){
    this.filterObj.month = event.currentTarget.value;
    this.filteredTravelData = multiFilter(this.allTravelData, this.filterObj);
  }
}
