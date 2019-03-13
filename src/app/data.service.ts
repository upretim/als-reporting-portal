
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
        console.log('this is data from service', this.data);
    }
    getdata(url): Observable<any> {
        return this.httpClient.get(url);
    }
    getJSONData() {
        this.getdata('assets/data.json').subscribe((rcvddata) => {
            this.data = rcvddata;
            console.log('Data from Server is ', this.data)
        })
    }

    //     getJSONData(){
    //       this.data = {

    //     "clients": {
    //         "metroHospitals":{
    //             "clientId": "001",
    //             "name":"Metro Hospitals Group",
    //             "hasChild":true,
    //             "childs": [
    //                {
    //                    "palamViharMetro": {
    //                     "clientId": "001_001",
    //                     "name":"Metro Hospital Palam Vihar",
    //                     "hasChild":false
    //                       },
    //                       "shadipurMetro": {
    //                         "clientId": "001_002",
    //                         "name":"RLKC Shadipur",
    //                         "hasChild":false

    //                     },
    //                     "noidaMetro": {
    //                         "clientId": "001_002",
    //                         "name":"Metro Hospital Noida",
    //                         "hasChild":false
    //                     }
    //                 } 
    //             ]
    //         },
    //         "aiimsND":{
    //             "clientId": "002",
    //             "name":"AIIMS New Delhi",
    //             "hasChild":true,
    //             "childs": [
    //                {
    //                    "heamotology": {
    //                     "clientId": "002_002",
    //                     "name":"AIIMS - Dept of Heamotology",
    //                     "hasChild":false
    //                     },
    //                     "amatomy": {
    //                         "clientId": "002_002",
    //                         "name":"AIIMS - Dept of amatomy",
    //                         "hasChild":false
    //                     }
    //                 } 
    //             ]
    //         },
    //         "dnaExpert":{
    //             "clientId": "003",
    //             "hasChild":false,
    //              "name": "DNA experts Pvt Ltd"
    //         },
    //         "dpmi":{
    //             "clientId": "004",
    //             "hasChild":false,
    //              "name": "DPMI Ashok Nagar"
    //         },
    //         "crystalCrop":{
    //             "clientId": "005",
    //             "hasChild":false,
    //              "name": "Crystal Crop Protection Pvt Ltd"
    //         }


    //     },
    //     "invoice":[
    //         {
    //             "no": "ALS001",
    //             "billDate": "12/11/2018",
    //             "dueDate": "10/01/2019",
    //             "billedTo": "003",
    //             "billedToName":"test",
    //             "type": "Retail",
    //             "amount": 12000,
    //             "amountRcvd": "No"
    //         },
    //         {
    //             "no": "ALS002",
    //             "billDate": "12/11/2018",
    //             "dueDate": "10/02/2019",
    //             "billedTo": "002",
    //             "billedToName":"test",
    //             "type": "Tax",
    //             "amount": 12000,
    //             "amountRcvd": "Yes"
    //         },
    //         {
    //             "no": "ALS003",
    //             "billDate": "12/10/2018",
    //             "dueDate": "10/01/2019",
    //             "billedTo": "001",
    //             "billedToName":"test",
    //             "type": "Retail",
    //             "amount": 12000,
    //             "amountRcvd": "No"
    //         },
    //         {
    //             "no": "ALS004",
    //             "billDate": "12/11/2018",
    //             "dueDate": "10/01/2019",
    //             "billedTo": "004",
    //             "billedToName":"test",
    //             "type": "Tax",
    //             "amount": 12000,
    //             "amountRcvd": "Yes"
    //         },
    //         {
    //             "no": "ALS005",
    //             "type": "Retail",
    //             "billDate": "12/12/2018",
    //             "dueDate": "12/01/2019",
    //             "billedTo": "001",
    //             "billedToName":"test",
    //             "amount": 12000,
    //             "amountRcvd": "No"
    //         }
    //     ]
    // }
    //         return this.data;    
    //     }



    addInvoice(invoice) {
        var inv = {
            "no": invoice.no,
            "billDate": invoice.billDate.day + "/" + invoice.billDate.month + "/" + invoice.billDate.year,
            "dueDate": invoice.dueDate.day + "/" + invoice.dueDate.month + "/" + invoice.dueDate.year,
            "billedTo": invoice.billedTo,
            "type": invoice.type,
            "amount": invoice.amount,
            "amountRcvd": invoice.amountRcvd
        }
        this.data.invoice.push(inv);
        console.log('updated data', this.data.invoice);
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
        this.editInv = inv;
        console.log('Invoice Updated', inv);
    }

    sendInvDetails() {
        return this.editInv;
    }
}
