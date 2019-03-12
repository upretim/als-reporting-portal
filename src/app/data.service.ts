
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
    data: any;
    editInv: any;
  constructor(private httpClient: HttpClient) {
     this.getJSONData();  
   }
    getdata(url): Observable<any> {
      return this.httpClient.get(url);
    }  
    getJSONData(){
      this.getdata('assets/data.json').subscribe((rcvddata)=>{
        this.data  = rcvddata;
        return this.data;  
      })  
    }

    

    addInvoice(invoice){
        var inv = {
            "no": invoice.no,
            "issueDate": invoice.billDate.day +"/" + invoice.billDate.month +"/"+  invoice.billDate.year, 
            "dueDate":  invoice.dueDate.day +"/" + invoice.dueDate.month +"/"+  invoice.dueDate.year,
            "issuedTo": invoice.billedTo,
            "invoiceType": invoice.type,
            "amount": invoice.amount,
            "paymentRcvd": invoice.amountRcvd
          }
        this.data.invoice.push(inv);
        console.log('updated data', this.data.invoice);
    }

    deleteInvoice(Invoice){
        console.log(this.data.invoice);
        for(let prop=0;prop<this.data.invoice.length;prop++){
            console.log('this.data.invoice[prop].no ', this.data.invoice[prop].no);
            console.log('Invoice ', Invoice);
            if(this.data.invoice[prop].no == Invoice){
             this.data.invoice.splice(prop, 1);
             console.log('Invoice Deleted', Invoice);
             console.log(this.data.invoice);
            }
         }      
    }
    updateInvoice(inv){
      this.editInv = inv;
      console.log('Invoice Updated', inv);
    }

    sendInvDetails(){
      return this.editInv;
    }
}
