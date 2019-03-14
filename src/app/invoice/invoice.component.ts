import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {DataService} from '../data.service';
import { Router } from  "@angular/router";
import { ValidatorFn, AbstractControl } from '@angular/forms';
import {minValueValidator, greateThanZero}  from '../validators/validator';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceFrom = new FormGroup({
    no: new FormControl(''),
    type: new FormControl(''),
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

  constructor(private fb: FormBuilder, private dataService: DataService , private router: Router) { 
    this.invoiceFrom = this.fb.group({
      no: ['', Validators.required],
      type: ['', Validators.required],
      billDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      billedTo: ['', Validators.required],
      billedToDept:[''],
      amount: ['', Validators.required, greateThanZero],
      amountRcvd: ['', Validators.required]
    });
  }
  


  ngOnInit() {
    this.clientList = this.dataService.data.clientsList;
  }

  onSubmit(val){
    // let selectedClient =  this.clientList.filter(function(value) {
    //   return value.clientId == val.billedTo;
    // });
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
   
    console.log('label is ', BilledTo, billedToName);
  this.dataService.addInvoice(val);
  this.router.navigate(['/home']);
  console.log('New Invoice added/updated successfully',val);
  }
  gotoHome(){
    this.router.navigate(['/home']);
  }
  clientSelected(event){
    this.invoiceFrom.controls.billedToDept.setValue("");
    this.hasSubClient = false;
    if(event.currentTarget.value!=""){
      let selectedClient =  this.clientList.filter(function(val) {
        return val.clientId == event.currentTarget.value;
      });
      if(selectedClient[0].hasChild){
        this.hasSubClient = true;
        this.subClientList =selectedClient[0].childs;
      }
    }
  }
}
