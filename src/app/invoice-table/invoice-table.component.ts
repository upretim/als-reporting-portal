import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Iinvoice } from '../model/model';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent implements OnInit {
  invoiceData: any[];
  invoiceDataPopulate: any[];
  clients: any;
  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.dataService.getdata('assets/data.json').subscribe((rcvddata) => {
      let data = rcvddata;
      this.dataService.data = rcvddata;
      this.invoiceData = data.invoice;
      this.clients = data.clients;
      for (let i = 0; i < this.invoiceData.length; i++) {
        for (let prop in this.clients) {
          if (this.invoiceData[i].billedTo == this.clients[prop].clientId) {
            this.invoiceData[i].billedToName = this.clients[prop].name;
          }
        }
      }
    });

  }


  DeleteInv(invoiceId) {
    this.dataService.deleteInvoice(invoiceId);
  }
  EditInv(inv){
    this.dataService.updateInvoice(inv);
    this.router.navigate(['/invoice']);
  }

}
