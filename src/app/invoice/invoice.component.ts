import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {DataService} from '../data.service';
import { Router } from  "@angular/router";
import { ValidatorFn, AbstractControl } from '@angular/forms';
import {minValueValidator, greateThanZero}  from '../validators/validator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceFrom = new FormGroup({
    no: new FormControl(''),
    // type: new FormControl(''),
    billDate: new FormControl(''),
    dueDate: new FormControl(''),
    billedTo: new FormControl(''),
    billedToDept:new FormControl(''),
    billedToName: new FormControl(''),
    amount: new FormControl(''),
    amountRcvd: new FormControl('')
  });

  clientList: any;
  subClientList:[]=[];
  hasSubClient:boolean = false;
  private invoiceToUpdate;
  subscription: Subscription;
 
  constructor(private fb: FormBuilder, private dataService: DataService , private router: Router) { 
    this.invoiceFrom = this.fb.group({
      no: ['', Validators.required],
      // type: ['', Validators.required],
      billDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      billedTo: ['', Validators.required],
      billedToDept:[''],
      amount: ['', Validators.required, greateThanZero],
      amountRcvd: ['', Validators.required]
    }); 
  }
  
   
  preFillFrom(invoice){
    if(invoice){
      document.getElementById("invNo")['readOnly'] = true;
      this.invoiceFrom.controls.no.setValue(invoice.no);
      // this.invoiceFrom.controls.type.setValue(invoice.type);
      this.invoiceFrom.controls.billedTo.setValue(invoice.billedTo);
      this.invoiceFrom.controls.billedToDept.setValue(invoice.subclientId);
      this.invoiceFrom.controls.amount.setValue(invoice.amount);
      this.invoiceFrom.controls.amountRcvd.setValue(invoice.amountRcvd);
    }   
}

  ngOnInit() {
    this.clientList = this.dataService.data.clientsList;
    this.subscription = this.dataService.lastUpdate$.subscribe(
      lastUpdate => {
        this.invoiceToUpdate = lastUpdate;
        this.hasSubClient = false;
        if(lastUpdate!=""){
          let selectedClient =  this.clientList.filter(function(val) {
            return val.clientId == lastUpdate.billedTo;
          });
          this.getSubClients(selectedClient);
        } 
       this.preFillFrom(this.invoiceToUpdate);
    });
  }

  onSubmit(val){
    var el = document.getElementById('invBilledTo');
    var BilledTo = el['options'][el['selectedIndex']].innerHTML;
    var el2 = document.getElementById('invBilledToDept');
    if(el2){
      var billedToName = el2['options'][el2['selectedIndex']].innerHTML;
      val.subclientId = this.invoiceFrom.controls.billedToDept.value;
    }
   
    if(el2){
      val.billedToName = billedToName;
    }
    else{
      val.billedToName = BilledTo;
    }
  this.dataService.addInvoice(val);
  }
  clientSelected(event){
    this.invoiceFrom.controls.billedToDept.setValue("");
    this.hasSubClient = false;
    if(event.currentTarget.value!=""){
      let selectedClient =  this.clientList.filter(function(val) {
        return val.clientId == event.currentTarget.value;
      });
     this.getSubClients(selectedClient);
    }
  }

  getSubClients(selectedClient){
    if(selectedClient[0].hasChild){
      this.hasSubClient = true;
      this.subClientList =selectedClient[0].childs;
    }

  }
}
