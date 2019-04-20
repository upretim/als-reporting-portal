import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Iinvoice } from '../model/model';

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
    console.log(this.UpdatedInvoiceData);
  }

  selectChangeMonth(event){
    console.log(event);
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
    this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
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

  multiFilter(array, filters) {
    const filterKeys = Object.keys(filters);
    // filters all elements passing the criteria
    return array.filter((item) => {
      // dynamically validate all filter criteria
      return filterKeys.every(key => {
        // ignores an empty filter
        if (!filters[key].length) return true;
        return filters[key].includes(item[key]);
      });
    });
  }

  addMonthYearToInvoiceData(invoiceData){
   this.UpdatedInvoiceData = Object.assign({},invoiceData);
   for(let i=0;i<invoiceData.length;i++){
     let month = invoiceData[i].billDate.split("/")[1];
     this.UpdatedInvoiceData[i]['year'] = invoiceData[i].no.split("/")[1];
     switch(month){
       case "1":
         this.UpdatedInvoiceData[i]['month'] = "jan";
        break;
       case "2":
       this.UpdatedInvoiceData[i]['month'] = "feb";
        break;
        case "3":
        this.UpdatedInvoiceData[i]['month'] = "mar";
        break;
       case "4":
       this.UpdatedInvoiceData[i]['month'] = "apr";
        break;
        case "5":
        this.UpdatedInvoiceData[i]['month'] = "may";
        break;
       case "6":
       this.UpdatedInvoiceData[i]['month'] = "jun";
        break;
        case "7":
        this.UpdatedInvoiceData[i]['month'] = "jul";
        break;
       case "8":
        this.UpdatedInvoiceData[i]['month'] = "aug";   
        break;
        case "9":
        this.UpdatedInvoiceData[i]['month'] = "sep";   
        break;
       case "10":
       this.UpdatedInvoiceData[i]['month'] = "oct";   
        break;
        case "11":
        this.UpdatedInvoiceData[i]['month'] = "nov";   
        break;
       case "12":
       this.UpdatedInvoiceData[i]['month'] = "dec";   
        break;
     } 
   }
  }
}
