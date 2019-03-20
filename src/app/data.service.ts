
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore} from '@angular/fire/firestore';
import { Iinvoice } from './model/model';
import { Router } from "@angular/router";



@Injectable({
    providedIn: 'root'
})
export class DataService {
   public data: any;
    list:Iinvoice[];
    clients:{}=[];
   // selectedInvoice: any;
   // https://embed.plnkr.co/UEPbIj4OmfWrMuU9jpzN/ - plunker link
   // https://www.youtube.com/watch?v=5I6k77uqtLY
   // https://www.youtube.com/watch?v=5I6k77uqtLY
   //https://stackoverflow.com/questions/42719503/angular-2-component-cannot-retrieve-data-from-service
   
    private selectedInvoice = new BehaviorSubject<any>('');
    lastUpdate$ = this.selectedInvoice.asObservable();
    constructor(private httpClient: HttpClient, private db: AngularFireDatabase, private angularFirestore: AngularFirestore, private router: Router) {
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
        var inv = Object.assign({},invoice);
         inv['$key'] = invoice.no; 
         inv['billDate'] = invoice.billDate.day + "/" + invoice.billDate.month + "/" + invoice.billDate.year;
         inv['dueDate'] = invoice.dueDate.day + "/" + invoice.dueDate.month + "/" + invoice.dueDate.year;
         //let _this = this;

        this.angularFirestore.collection('Invoices').doc(inv.$key).set(inv)
        .then((success) =>{
            console.log("Invoice Added/Updated Successfully ", success);
            this.data = null;
        })
        .catch((error) => {
            console.error("Error adding/editing invoice: ", error);
        }).finally(()=>{
            this.router.navigate(['/home']);
        });
    }
    

    deleteInvoice(Invoice) {
        let _this = this;
        this.angularFirestore.collection("Invoices").doc(Invoice).delete().then(function() {
            console.log("Document successfully deleted!");
            _this.data = null;
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}
