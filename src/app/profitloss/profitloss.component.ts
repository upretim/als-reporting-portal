import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnInit {

  clients: any;
  clientList: any;
  constructor(private dataService: DataService) { 
    this.clientList = this.dataService.data.clientsList;
  }

  ngOnInit() {
  }
  selectChangeMonth(event){
    console.log(event);
  }

  selectChangeClient(event){
    console.log(event);
  }
}
