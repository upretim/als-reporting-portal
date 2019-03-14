import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Iinvoice } from '../model/model';
import { Router } from "@angular/router";

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
  subClientArr: []=[];
  subClientList:[]=[];
  totalValue:number =0;
  numberOfInv: number = 0;
  hasDataToDisplay:boolean = true;
  filterObj : any = {
  }
  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    if (this.dataService.data) {
      this.invoiceData = this.dataService.data.invoice;
      this.hasDataToDisplay = true;
      this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
        return accumulator + invoice.amount;
      }, 0);
      if(this.invoiceData.length==0){
        this.hasDataToDisplay = false;
      }
    } else {
      this.dataService.getdata('assets/data.json').subscribe((rcvddata) => {
        this.dataService.data = rcvddata;
        this.invoiceData = this.dataService.data.invoice;
        this.hasDataToDisplay = true;
        this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
          return accumulator + invoice.amount;
        }, 0);
        if(this.invoiceData.length==0){
          this.hasDataToDisplay = false;
        }
      });
    }
  }


  DeleteInv(invoiceId) {
    this.dataService.deleteInvoice(invoiceId);
  }
  EditInv(inv) {
    this.dataService.updateInvoice(inv);
    this.router.navigate(['/invoice']);
  }

  selectChangeClient(event){
    this.hasSubClient = false;
    this.subClientArr = [];
   let selectedClientId = event.currentTarget.value;
   this.filterObj.billedTo = selectedClientId;
   this.clientList = this.dataService.data.clientsList;
   this.filterObj.subclientId = "";
   if(event.currentTarget.value!=""){
    let selectedClient =  this.clientList.filter(function(val) {
      return val.clientId == event.currentTarget.value;
    });
    if(selectedClient[0].hasChild){
      this.hasSubClient = true;
      this.subClientList =selectedClient[0].childs;
    }
  }
   this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
   this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
    return accumulator + invoice.amount;
  }, 0);
   this.hasDataToDisplay = true;
    if(this.invoiceData.length==0){
      this.hasDataToDisplay = false;
    }
  }


  selectChangeBillRealized(event){
   let selectedClientId = event.currentTarget.value;
   this.filterObj.amountRcvd = selectedClientId;
   this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
   this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
    return accumulator + invoice.amount;
  }, 0);
   this.hasDataToDisplay = true;
    if(this.invoiceData.length==0){
      this.hasDataToDisplay = false;
    }
  }

  selectChangeSubClient(event){
    let selectedClientId  = event.currentTarget.value;
     this.filterObj.subclientId = selectedClientId;
    this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
    this.totalValue = this.invoiceData.reduce(function (accumulator, invoice) {
      return accumulator + invoice.amount;
    }, 0);
    this.hasDataToDisplay = true;
    if(this.invoiceData.length==0){
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
}
