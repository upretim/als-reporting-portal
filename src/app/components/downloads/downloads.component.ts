import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { multiFilter, addINRCommaSeparator } from '../../utils/util.functions';
import { DataService } from '../../services/data.service';
import { Iinvoice } from '../../models/model';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import {IInvoiceFilter} from '../../models/model';
declare var jsPDF: any;

declare var autoTable: any;

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  invoiceData: any;
  clients: any;
  clientList: any;
  hasSubClient = false;
  subClientList: [] = [];
  totalValue: number = 0;
  numberOfInv: number = 0;
  hasDataToDisplay: boolean = true;
  disableDownloadButton = true;
  selectedPage: number = 1;

  filterObj: IInvoiceFilter = {
    amountRcvd: "No",
    billedTo: "",
    subclientId: ""
  }
  constructor( private dataService: DataService, 
    private _store: Store<IAppState>, 
    private router: Router,
     private ngxService: NgxUiLoaderService
     ) { }


  ngOnInit() {
    this.populateUI(this.dataService.data);
    console.log(addINRCommaSeparator(2000));
    console.log(addINRCommaSeparator(500));
    console.log(addINRCommaSeparator(205440));
  }

  selectChangeClient(event) {
    this.hasSubClient = false;
    this.filterObj.billedTo = event.currentTarget.value;
    this.filterObj.subclientId ="";
   this.getSubClient(this.filterObj.billedTo)
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
    else{
      this.disableDownloadButton = true;
    }
  }
  selectChangeSubClient(event) {
    this.filterObj.subclientId = event.currentTarget.value;
    this.filterData();
  }

  filterData() {
    this.invoiceData = multiFilter(this.dataService.data.invoice, this.filterObj);
    this.totalValue = this.invoiceData.reduce((accumulator, invoice) => {
      return accumulator + invoice.amount;
    }, 0);
    
    if (this.invoiceData.length == 0) {
      this.hasDataToDisplay = false;
      this.disableDownloadButton = true;
    }
    else{
      this.hasDataToDisplay = true;
      if(this.filterObj.billedTo!=""){
        this.disableDownloadButton = false;
      }
    }
  }

  populateUI(data) {
    this.invoiceData = data.invoice;
    this.clientList = data.clientsList;
    this.filterData();
  }

  generatePdf() {
    let clientName = this.invoiceData[0].billedToName;
    var columns = [{
            title: "SN.",
            dataKey: "id"
        },
        {
            title: "Invoice No",
            dataKey: "billNo"
        },
        {
            title: "Bill Date",
            dataKey: "billDate"
        },
        {
          title: "Due Date",
          dataKey: "dueDate"
         },
         {
          title: "Amount",
          dataKey: "amount"
         },
         {
          title: "Payment Rcvd",
          dataKey: "paymentStatus"
         },
    ];
    var rows = [];
  var total = 0;
    for(let i=0; i<this.invoiceData.length;i++){
      let objToPush = {
        'id' : ((i+1) +"."),
        'billNo': this.invoiceData[i].no,
        'billDate' : this.invoiceData[i].billDate,
        'dueDate' : this.invoiceData[i].dueDate,
        'amount' : addINRCommaSeparator(this.invoiceData[i].amount),
        'paymentStatus': this.invoiceData[i].amountRcvd,
      }
      total = total+ this.invoiceData[i].amount;
      rows.push(objToPush);
    }
    // rows.reverse();
     rows.push({
      'id' : "",
      'billNo': "",
      'billDate': "",
      'dueDate': "Total Due",
      'amount':  addINRCommaSeparator(total),
      'paymentStatus': "",
     });

    var doc = new jsPDF('p', 'pt');
    var header = function (data) {
        doc.setFontSize(11);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        //30, 120 X and Y
        doc.text('Receivable summary ' + clientName, 30, 120);
    };
    doc.autoTable(columns, rows, {margin: {top: 150}, didDrawPage: header});
     doc.save( clientName + ".pdf");
 }

}
