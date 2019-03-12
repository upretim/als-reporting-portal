export interface Iinvoice {
    no: string,
    issueDate: string,
    dueDate: string,
    billedTo: string,
    billedToName: string,
    invoiceType: string,
    amount: number,
    paymentRcvd: string
}
