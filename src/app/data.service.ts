
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore} from '@angular/fire/firestore';
import { Iinvoice } from './model/model';



@Injectable({
    providedIn: 'root'
})
export class DataService {
    data: any;
    list:Iinvoice[];
    clients:{}=[];
   // selectedInvoice: any;
   // https://embed.plnkr.co/UEPbIj4OmfWrMuU9jpzN/ - plunker link
   // https://www.youtube.com/watch?v=5I6k77uqtLY
   // https://www.youtube.com/watch?v=5I6k77uqtLY
   //https://stackoverflow.com/questions/42719503/angular-2-component-cannot-retrieve-data-from-service
   
    private selectedInvoice = new BehaviorSubject<any>('');
    lastUpdate$ = this.selectedInvoice.asObservable();
    constructor(private httpClient: HttpClient, private db: AngularFireDatabase, private angularFirestore: AngularFirestore) {
    }

    getDataFromFireBase(collection:string):Observable<any>{
        return this.angularFirestore.collection(collection).snapshotChanges();
    }

    publishLastUpdate(inv) {
        this.selectedInvoice.next(inv);
      }
    addInvoice(invoice) {
        if (invoice.subclientId== undefined){
            invoice.subclientId = ""
        }
        var inv = {
            $key: invoice.no,
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

        this.angularFirestore.collection('Invoices').doc(inv.$key).set(inv)
        .then(function() {
            console.log("Invoice Added/Updated Successfully");
        })
        .catch(function(error) {
            console.error("Error adding invoice: ", error);
        });
    }
    

    deleteInvoice(Invoice) {
        console.log(this.data.invoice);
        this.angularFirestore.collection("Invoices").doc(Invoice).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    // updateInvoice(inv) {
    //     console.log('Invoice Updated', this.data.invoice);
    //     inv.$key = inv.no;
    //     this.angularFirestore.collection('Invoices').doc(inv.$key).set(inv)
    //     .then(function() {
    //         console.log("Invoice Added Successfully");
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding invoice: ", error);
    //     });
    // }
}
