import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Iinvoice } from '../model/model';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent implements OnInit {
  invoiceData: Iinvoice[];
  clients: any;
  clientList: any;
  hasSubClient = false;
  subClientList: [] = [];
  totalValue: number = 0;
  numberOfInv: number = 0;
  hasDataToDisplay: boolean = true;
  filterObj: any = {
  }
  constructor(private dataService: DataService, private router: Router, private ngxService: NgxUiLoaderService) {
    
  }

  ngOnInit() {
    this.ngxService.start();
    this.ngxService.startLoader('loader-01');
    if(!this.dataService.data){
      this.getDataFromDB();
    }
    else{
      this.populateUI(this.dataService.data)
    }
  }


  DeleteInv(invoiceId) {
    this.dataService.deleteInvoice(invoiceId);
  }
  EditInv(inv) {
     this.dataService.publishLastUpdate(inv);
    this.router.navigate(['/invoice']);
  }

  selectChangeClient(event) {
    this.hasSubClient = false;
    let selectedClientId = event.currentTarget.value;
    this.filterObj.billedTo = selectedClientId;
    this.filterObj.subclientId = "";
    if (event.currentTarget.value != "") {
      let selectedClient = this.clientList.filter(function (val) {
        return val.clientId == event.currentTarget.value;
      });
      if (selectedClient[0].hasChild) {
        this.hasSubClient = true;
        this.subClientList = selectedClient[0].childs;
      }
    }
    this.filterData();  
  }


  selectChangeBillRealized(event) {
    let selectedClientId = event.currentTarget.value;
    this.filterObj.amountRcvd = selectedClientId;
    this.filterData(); 
  }

  selectChangeSubClient(event) {
    let selectedClientId = event.currentTarget.value;
    this.filterObj.subclientId = selectedClientId;
    this.filterData(); 
  }

  addInvoice() {
    this.dataService.publishLastUpdate('');
    this.router.navigate(['/invoice']);
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

  getDataFromDB(){
    this.ngxService.startLoader('loader-01');
    combineLatest(
      this.dataService.getDataFromFireBase('Invoices'),
      this.dataService.getDataFromFireBase('Clients')
    ).pipe(
      map(( [invoices,clients] ) => {
        return { invoices, clients}
      })
    ).subscribe((res) => {
      this.dataService.data = {};
      let invoice = res['invoices'].map(item => {
        return item.payload.doc.data();
      });
      let client = res['clients'].map(item => {
        return item.payload.doc.data();
      });
       this.dataService.data.invoice =  invoice;
       this.dataService.data.clientsList =  client;
      this.populateUI(this.dataService.data);
    }, err => {
      console.log('Error in fetching data from Firebase ',err)
    });
  }

  populateUI(data){
    this.invoiceData = data.invoice;
    this.clientList = data.clientsList;
    this.hasDataToDisplay = true;
    this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
      return accumulator + invoice.amount;
    }, 0);
    if (this.invoiceData.length == 0) {
      this.hasDataToDisplay = false;
    }
    this.ngxService.stopLoader('loader-01');
    this.ngxService.stop();
  }

  filterData(){
    this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
    this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
      return accumulator + invoice.amount;
    }, 0);
    this.hasDataToDisplay = true;
    if (this.invoiceData.length == 0) {
      this.hasDataToDisplay = false;
    }
  }
}
