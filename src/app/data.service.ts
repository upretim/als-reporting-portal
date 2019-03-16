
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    data: any;
   // selectedInvoice: any;
   // https://embed.plnkr.co/UEPbIj4OmfWrMuU9jpzN/ - plunker link

    private selectedInvoice = new BehaviorSubject<any>('');
    lastUpdate$ = this.selectedInvoice.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    publishLastUpdate(inv) {
        this.selectedInvoice.next(inv);
      }

    getdata(url): Observable<any> {
        return this.httpClient.get(url);
    }
    getJSONData() {
        this.getdata('assets/data.json').subscribe((rcvddata) => {
            this.data = rcvddata;
        })
    }

    addInvoice(invoice) {
        var inv = {
            "no": invoice.no,
            "billDate": invoice.billDate.day + "/" + invoice.billDate.month + "/" + invoice.billDate.year,
            "dueDate": invoice.dueDate.day + "/" + invoice.dueDate.month + "/" + invoice.dueDate.year,
            "billedTo": invoice.billedTo,
            "type": invoice.type,
            "amount": invoice.amount,
            "amountRcvd": invoice.amountRcvd,
            "billedToName": invoice.billedToName,
            "subclientId": invoice.subclientId         
        }
        this.data.invoice.push(inv);
    }

    deleteInvoice(Invoice) {
        console.log(this.data.invoice);
        for (let prop = 0; prop < this.data.invoice.length; prop++) {
            console.log('this.data.invoice[prop].no ', this.data.invoice[prop].no);
            console.log('Invoice ', Invoice);
            if (this.data.invoice[prop].no == Invoice) {
                this.data.invoice.splice(prop, 1);
                console.log('Invoice Deleted', Invoice);
                console.log(this.data.invoice);
            }
        }
    }
    updateInvoice(inv) {
        console.log('Invoice Updated', inv);
    }
}
