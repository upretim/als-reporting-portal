import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { MainPageFilter } from '../../store/selectors/main-page-filter.selectors';
import { DataService } from '../../services/data.service';
import { Iinvoice } from '../../models/model';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { multiFilter } from '../../utils/util.functions';
import {IInvoiceFilter} from '../../models/model';
import { getClientFilter, getSubClientFilter, getBillStatusFilter} from '../../store/actions/main-page-filters.actions';

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

  filterObj: IInvoiceFilter = {
    amountRcvd: "",
    billedTo: "",
    subclientId: ""
  }
    cilent: string;
    subCilent: string;
    amountReceived: string;
    mypageNumber: number =1;
    pageNumber: number = 1;
    subscription: Subscription;



  constructor( private dataService: DataService, 
               private _store: Store<IAppState>, 
               private router: Router,
                private ngxService: NgxUiLoaderService
                ) { }

  ngOnInit() {
  //  ngrx implementation
   this._store.pipe(select(MainPageFilter)).subscribe(data => {
      this.filterObj = data;
      this.cilent = this.filterObj.billedTo;
      this.subCilent  = this.filterObj.subclientId;
      this.amountReceived =  this.filterObj.amountRcvd;
      if (!this.dataService.data) {
        this.getDataFromDB();
      }
      else {
        this.populateUI(this.dataService.data)
      }
      this.getSubClient(this.filterObj.billedTo);
  })
 }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
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
    this.selectedPage = 1;
    this.hasSubClient = false;
    this.cilent = event.currentTarget.value;
    this.subCilent = "";
    this.amountReceived = "";
    this._store.dispatch(new getClientFilter({
      invfilter: {
        amountRcvd: this.amountReceived,
        billedTo: this.cilent,
        subclientId: this.subCilent
      },
      pageNo: {
        pageNumber: 1
      }
    }));

   this.getSubClient(this.cilent)
    this.filterData();
  }

  getSubClient(cilent){
    if (cilent != "") {
      let selectedClient = this.clientList.filter((val) => {
        return val.clientId == cilent;
      });
      if (selectedClient[0].hasChild) {
        this.hasSubClient = true;
        this.subClientList = selectedClient[0].childs;
      }
    }
  }

  selectChangeBillRealized(event) {
    this.amountReceived = event.currentTarget.value;
    this._store.dispatch(new getBillStatusFilter({
      invfilter: {
        amountRcvd: this.amountReceived,
        billedTo: this.cilent,
        subclientId: this.subCilent
      },
      pageNo: {
        pageNumber: 1
      }
    }));
    this.selectedPage = 1;
    this.filterData();
  }

  selectChangeSubClient(event) {
    this.selectedPage = 1;
    this.subCilent = event.currentTarget.value;
    this._store.dispatch(new getSubClientFilter({
      invfilter: {
        amountRcvd: this.amountReceived,
        billedTo: this.cilent,
        subclientId: this.subCilent
      },
      pageNo: {
        pageNumber: 1
      }
    }));
    this.filterData();
  }

  addInvoice() {
    this.dataService.publishLastUpdate('');
    this.router.navigate(['/invoice']);
  }


  getDataFromDB() {
    this.ngxService.start();
    this.ngxService.startLoader('loader-01');
    this.subscription = combineLatest(
    this.dataService.getDataFromFireBase('Invoices'),
    this.dataService.getDataFromFireBase('Clients'),
    this.dataService.getDataFromFireBase('TravelData')
    ).pipe(
      map(([invoices, clients, travelData]) => {
        return { invoices, clients, travelData }
      })
    ).subscribe((res) => {
      this.dataService.data = {};
      let invoice = res['invoices'].map(item => {
        return item.payload.doc.data();
      });
      let client = res['clients'].map(item => {
        return item.payload.doc.data();
      });
      let travelData = res['travelData'].map(item => {
        return item.payload.doc.data();
      });
      invoice.reverse();
      this.dataService.data.invoice = invoice;
      this.dataService.data.clientsList = client;
      this.dataService.travelData = travelData; 

      this.populateUI(this.dataService.data);
      this.ngxService.stopLoader('loader-01');
      this.ngxService.stop();
    }, err => {
      console.log('Error in fetching data from Firebase ', err)
    });
  }

  populateUI(data) {
    this.invoiceData = data.invoice;
    this.clientList = data.clientsList;
    this.hasDataToDisplay = true;
    this.filterData();
  }

  filterData() {
    this.invoiceData = multiFilter(this.dataService.data.invoice, this.filterObj);
    this.totalValue = this.invoiceData.reduce((accumulator, invoice) => {
      return accumulator + invoice.amount;
    }, 0);
    this.hasDataToDisplay = true;
    if (this.invoiceData.length == 0) {
      this.hasDataToDisplay = false;
    }
  }

  updatePage(event) {
    this.selectedPage = event;
    this.pageNumber = event;
  }

}
