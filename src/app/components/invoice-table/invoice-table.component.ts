import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Iinvoice } from '../../models/model';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { _ } from 'underscore';
import {multiFilter} from '../../utils/util.functions';

// Pagination refrence
//  https://www.npmjs.com/package/ngx-pagination

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
  selectedPage: number = 1;
  filterObj: any = {
  }
  constructor(private dataService: DataService, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    if(!this.dataService.data){
      this.getDataFromDB();
    }
    else{
      this.populateUI(this.dataService.data)
    }
    this.filterObj.amountRcvd = "";
  }

  DeleteInv(invoiceId) {
    this.dataService.deleteInvoice(invoiceId);
  }
  EditInv(inv) {
     this.dataService.publishLastUpdate(inv);
    this.router.navigate(['/invoice']);
  }

  selectChangeClient(event) {
    this.selectedPage = 1;
    this.hasSubClient = false;
    let selectedClientId = event.currentTarget.value;
    this.filterObj.billedTo = selectedClientId;
    this.filterObj.subclientId = "";
    this.filterObj.amountRcvd = "";
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

  selectChangeBillRealized(event) {
    this.selectedPage = 1;
    let selectedClientId = event.currentTarget.value;
    this.filterObj.amountRcvd = selectedClientId;
    this.filterData(); 
  }

  selectChangeSubClient(event) {
    this.selectedPage = 1;
    let selectedClientId = event.currentTarget.value;
    this.filterObj.subclientId = selectedClientId;
    this.filterData(); 
  }

  addInvoice() {
    this.dataService.publishLastUpdate('');
    this.router.navigate(['/invoice']);
  }


  getDataFromDB(){
    this.ngxService.start();
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
      invoice.reverse();
       this.dataService.data.invoice =  invoice;
       this.dataService.data.clientsList =  client;
      
      this.populateUI(this.dataService.data);
      this.ngxService.stopLoader('loader-01');
      this.ngxService.stop();
    }, err => {
      console.log('Error in fetching data from Firebase ',err)
    });
  }

  populateUI(data){
    this.invoiceData = data.invoice;
    this.clientList = data.clientsList;
    this.hasDataToDisplay = true;
    this.filterData();
  }

  filterData(){
    this.invoiceData = multiFilter(this.dataService.data.invoice, this.filterObj);
    this.totalValue = this.invoiceData.reduce( (accumulator, invoice) => {
      return accumulator + invoice.amount;
    }, 0);
    this.hasDataToDisplay = true;
    if (this.invoiceData.length == 0) {
      this.hasDataToDisplay = false;
    }
  }

  updatePage(event){
    this.selectedPage = event;
  }
  
}