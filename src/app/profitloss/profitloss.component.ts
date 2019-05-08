import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import { Iinvoice } from '../model/model';
import {multiFilter} from '../utils/util.functions';
@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnInit {
  invoiceData: Iinvoice[];
  clients: any;
  clientList: any;
  hasSubClient = false;
  subClientList: [] = [];
  totalSaleValue: number = 0;
  totalPurchaseValue: number = 0;
  totalTaxValue: number = 0;
  totalDeliveryExpenses: number = 0;
  numberOfInv: number = 0;
  hasDataToDisplay: boolean = true;
  selectedPage: number =1;
  totalSum= [];
  filterObj: any = {
  }
  UpdatedInvoiceData: any;

  constructor(private dataService: DataService) { 
    this.clientList = this.dataService.data.clientsList;
  }

  ngOnInit() {
    this.addMonthYearToInvoiceData(this.dataService.data.invoice);
    let d = new Date();
    this.filterObj.month = d.getMonth()+1+"";
    this.filterData();  
  }

  selectChangeMonth(event){
    this.filterObj.month = event.currentTarget.value;
    this.filterData();  
  }

 

  selectChangeClient(event) {
    this.selectedPage = 1;
    this.hasSubClient = false;
    let selectedClientId = event.currentTarget.value;
    this.filterObj.billedTo = selectedClientId;
    this.filterObj.subclientId = "";
    if (event.currentTarget.value != "") {
      let selectedClient = this.clientList.filter( (val)=> {
        return val.clientId == event.currentTarget.value;
      });
      if (selectedClient[0].hasChild) {
        this.hasSubClient = true;
        this.subClientList = selectedClient[0].childs;
      }
    }
    this.filterData();  
  }

  filterData(){
    this.invoiceData = multiFilter(this.UpdatedInvoiceData, this.filterObj);
    this.totalSaleValue = this.invoiceData.reduce( (accumulator, invoice) => {
      return accumulator + invoice.amount;
    }, 0);

    this.totalPurchaseValue = this.invoiceData.reduce( (accumulator, invoice) => {
      return accumulator + invoice.purchaseamount;
    }, 0);
    this.totalTaxValue = this.invoiceData.reduce( (accumulator, invoice) => {
      return accumulator + invoice.taxAmount;
    }, 0);
    this.totalDeliveryExpenses = this.invoiceData.reduce( (accumulator, invoice) => {
      return accumulator + invoice.othExpenses;
    }, 0);


    this.hasDataToDisplay = true;
    if (this.invoiceData.length == 0) {
      this.hasDataToDisplay = false;
    }
  }

  addMonthYearToInvoiceData(invoiceData){
   this.UpdatedInvoiceData = [...invoiceData]
   for(let i=0;i<invoiceData.length;i++){
    this.UpdatedInvoiceData[i]['month'] = invoiceData[i].billDate.split("/")[1];
     this.UpdatedInvoiceData[i]['year'] = invoiceData[i].no.split("/")[1]; 
   }
  }
}
