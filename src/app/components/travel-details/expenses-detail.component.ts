import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {multiFilter} from '../../utils/util.functions';
import * as _ from 'lodash';
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
    let d = new Date();
    this.filterObj.month = d.getMonth()+1+"";
    if (this.dataService.travelData){
      this.allTravelData = this.dataService.travelData;
      this.filteredTravelData = _.orderBy(this.dataService.travelData, ['date'],['desc']);
    }
    else{
       this.ngxService.start();
       this.ngxService.startLoader('loader-01');
       this.dataService.getDataFromFireBase('TravelData').subscribe((response)=>{
        this.allTravelData = response.map(item => {
          return item.payload.doc.data();
        });
        this.dataService.travelData = this.allTravelData; 
        this.filteredTravelData = _.orderBy(this.allTravelData, ['date'],['desc']);
        this.ngxService.stopLoader('loader-01');
        this.ngxService.stop();
      },
      (error)=>{
        console.log('Error in ferching travel details', error);
        this.ngxService.stopLoader('loader-01');
        this.ngxService.stop();
      })
    }
  }

  addExpenses(){
    this.router.navigate(['/add-travel']);
  }

  selectChangeMonth(event){
    this.filterObj.month = event.currentTarget.value;
    let tempData = _.orderBy(this.allTravelData, ['date'],['desc']);
    this.filteredTravelData = multiFilter(tempData, this.filterObj);
  }
}
