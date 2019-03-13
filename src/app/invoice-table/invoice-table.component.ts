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
   this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
  }


  selectChangeBillRealized(event){
   let selectedClientId = event.currentTarget.value;
   this.filterObj.amountRcvd = selectedClientId;
   this.invoiceData = this.multiFilter(this.dataService.data.invoice, this.filterObj);
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
