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
import { _ } from 'underscore';
import { multiFilter } from '../../utils/util.functions';
import { getClientFilter, getSubClientFilter, getBillStatusFilter, getPageNoFilter } from '../../store/actions/main-page-filters.actions';


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
  };
  cilent: string = "";
  subCilent: string = "";
  pageNumber: number;
  amountReceived: string = "";
  mypageNumber: number =2;
  subscription: Subscription;


  constructor(private dataService: DataService, private _store: Store<IAppState>, private router: Router, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {

  //  ngrx implementation
  this.subscription = this._store.pipe(select(MainPageFilter)).subscribe(data => {
    this.filterObj = data;
    console.log('Filter data form store is ', data);
 })

    if (!this.dataService.data) {
      this.getDataFromDB();
    }
    else {
      this.populateUI(this.dataService.data)
    }
    this.getSubClient(this.filterObj.billedTo);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
        subclientId: this.subCilent,
        pageNumber: 1
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
        subclientId: this.subCilent,
        pageNumber: 1
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
        subclientId: this.subCilent,
        pageNumber: 1
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
    combineLatest(
      this.dataService.getDataFromFireBase('Invoices'),
      this.dataService.getDataFromFireBase('Clients')
    ).pipe(
      map(([invoices, clients]) => {
        return { invoices, clients }
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
      this.dataService.data.invoice = invoice;
      this.dataService.data.clientsList = client;

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
    // this._store.dispatch(new getPageNoFilter({
    //   invfilter: {
    //     amountRcvd: this.amountReceived,
    //     billedTo: this.cilent,
    //     subclientId: this.subCilent,
    //     pageNumber: this.pageNumber
    //   },
    //   pageNo: {
    //     pageNumber: this.pageNumber
    //   }
    // }));
  }

}
