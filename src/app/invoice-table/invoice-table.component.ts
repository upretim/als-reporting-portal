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
  filterObj : any = {
    billedTo: "none",
    amountRcvd: "none"

  }
  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    if (this.dataService.data) {
      this.invoiceData = this.dataService.data.invoice;
      this.clients = this.dataService.data.clients;
      for (let i = 0; i < this.invoiceData.length; i++) {
        for (let prop in this.clients) {
          if (this.invoiceData[i].billedTo == this.clients[prop].clientId) {
            this.invoiceData[i].billedToName = this.clients[prop].name;
          }
        }
      }
    } else {
      this.dataService.getdata('assets/data.json').subscribe((rcvddata) => {
        this.dataService.data = rcvddata;
        this.invoiceData = this.dataService.data.invoice;
        this.clients = this.dataService.data.clients;
        for (let i = 0; i < this.invoiceData.length; i++) {
          for (let prop in this.clients) {
            if (this.invoiceData[i].billedTo == this.clients[prop].clientId) {
              this.invoiceData[i].billedToName = this.clients[prop].name;
            }
          }
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
   
    let selectedClientId = event.currentTarget.value;
   this.filterObj.billedTo = selectedClientId;
    if(selectedClientId!="none"){
      this.invoiceData = [];
      for(let val in  this.dataService.data.invoice){
         if(this.dataService.data.invoice[val].billedTo ==this.filterObj.billedTo){
           this.invoiceData.push(this.dataService.data.invoice[val])
         }
      }
    }
    else{
      this.invoiceData  = this.dataService.data.invoice;
    }
  }


  selectChangeBillRealized(event){
   let selectedClientId = event.currentTarget.value;
   this.filterObj.amountRcvd = selectedClientId;
    if(selectedClientId!="none"){
      this.invoiceData = [];
      for(let val in  this.dataService.data.invoice){
         if(this.dataService.data.invoice[val].amountRcvd ==this.filterObj.amountRcvd){
           this.invoiceData.push(this.dataService.data.invoice[val])
         }
      }
    }
    else{
      this.invoiceData  = this.dataService.data.invoice;
    }
  }
}
