import { IInvoiceFilter } from '../../models/model';
import {IMainPageNo} from '../../models/model';

export interface IMainPageFilterState {
    invfilter: IInvoiceFilter,
    pageNo: IMainPageNo
}

export const initialMainPageFilterState: IMainPageFilterState = {
    invfilter: {
        amountRcvd: "",
        billedTo: "",
        subclientId: ""
      },
    pageNo: {
        pageNumber:1
    }
}