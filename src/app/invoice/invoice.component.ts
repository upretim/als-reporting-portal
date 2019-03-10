import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
    amount: new FormControl(''),
    amountRcvd: new FormControl('')
  });

  constructor(private fb: FormBuilder) { 
    this.invoiceFrom = this.fb.group({
      no: ['', Validators.required],
      type: ['', Validators.required],
      billDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      billedTo: ['', Validators.required],
      amount: ['', Validators.required],
      amountRcvd: ['', Validators.required]
    });
   
  }

  ngOnInit() {
    
  }

  onSubmit(val){
  console.log('New Invoice added successfully',val)
  }

}
