export interface Iinvoice {
    $key?:null,
    no: string,
    issueDate: string,
    dueDate: string,
    billedTo: string,
    billedToName: string,
    amount: number,
    paymentRcvd: string,
    purchaseamount: number,
    othExpenses: number,
    taxAmount: number
}

export interface IInvoiceFilter {
    amountRcvd: string;
    billedTo: string;
    subclientId: string;
}

export interface IMainPageNo {
    pageNumber: number;
}