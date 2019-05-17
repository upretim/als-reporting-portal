import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  expenseFrom = new FormGroup({
    date: new FormControl(''),
    amount: new FormControl(''),
    name: new FormControl(''),
    againstBill: new FormControl(''),
    desc: new FormControl('')
  });

  constructor(private fb: FormBuilder, private dataService: DataService) { 
    this.expenseFrom = this.fb.group({
      date:['', Validators.required],
      amount: ['', Validators.required],
      name: ['', Validators.required],
      againstBill: ['', Validators.required],
      desc: ['', Validators.required]
    }); 
  }

  ngOnInit() {
  }
  onSubmit(formValue){
  this.dataService.addExpense(formValue);
  }
}
