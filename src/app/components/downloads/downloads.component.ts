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
import { getLogo } from '../../utils/logo';

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
    this.disableDownloadButton = false;
    if (cilent != "") {
      let selectedClient = this.clientList.filter((val) => {
        return val.clientId == cilent;
      });
      if (selectedClient[0].hasChild) {
        this.disableDownloadButton = true;
        this.hasSubClient = true;
        this.subClientList = selectedClient[0].childs;
      }
    }
  }
  selectChangeSubClient(event) {
    this.filterObj.subclientId = event.currentTarget.value;
    if(this.filterObj.subclientId==""){
      this.disableDownloadButton = true;
    }
    else{
      this.disableDownloadButton = false;
    }
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
    }
  }

  populateUI(data) {
    this.invoiceData = data.invoice;
    this.clientList = data.clientsList;
    this.filterData();
  }

  generatePdf() {
    let bottomY = 0;
    let logoString = getLogo();
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
     rows.push({
      'id' : "",
      'billNo': "",
      'billDate': "",
      'dueDate': "Total Due",
      'amount':  addINRCommaSeparator(total),
      'paymentStatus': "",
     });
     let address = {
      name : "Arth Lab Supplies",
      addlineOne : "B-6, Jeewan Park, Uttam Nagar",
      addlineTwo : "New Delhi - 110059",
      phoneNo : "Mobile: +91-7042573075",
      email : "Email: contact@arthlabsupplies.com",
      website : "Web: www.arthlabsupplies.com"
     }
     


    var doc = new jsPDF('p', 'pt');
    var header = function (data) {
        doc.setFontSize(11);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text('Receivable summary ' + clientName, 30, 135);
    };
    let marginTop = 150;
    doc.addImage(logoString, 'JPEG', 10, 10, 150, 64);
    doc.autoTable(columns, rows, {margin: {top: marginTop}, didDrawPage: header});
    let marginBottm = 30;
    bottomY = marginTop +  marginBottm + (this.invoiceData.length+1)*25;
      doc.setFontSize(11);
      doc.setFontType('bold');
      doc.setTextColor(40);
      let xValue = 420;
      let Yvalue = 20;
      let lineHeight = 14;
      doc.text(address.name, xValue, Yvalue);
      doc.setFontSize(10);
      doc.setFontType('normal');
      Yvalue = Yvalue + lineHeight;
      doc.text(address.addlineOne, xValue, Yvalue);
      Yvalue = Yvalue + lineHeight;
      doc.text(address.addlineTwo, xValue, Yvalue);
      Yvalue = Yvalue + lineHeight;
      doc.text(address.phoneNo, xValue, Yvalue);
      Yvalue = Yvalue + lineHeight;
      doc.text(address.email, xValue, Yvalue);
      Yvalue = Yvalue + lineHeight;
      doc.text(address.website, xValue, Yvalue);
      doc.setFontSize(12);
      doc.text('Summary of Receivables', 40, bottomY);
      doc.text('Number of invoices: ' + (this.invoiceData.length), 40, bottomY+20);
      doc.text('Total amount due: ' + addINRCommaSeparator(total), 40, bottomY+40);
      doc.save(clientName + ".pdf");
 }

}
