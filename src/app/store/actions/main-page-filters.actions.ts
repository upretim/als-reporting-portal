import {Action} from '@ngrx/store';
import {IMainPageFilterState} from '../../store/state/main-page-filter.state';

export enum EMainPageFilterAction {
    getClientFilter = "[Filter] Client UpdateFilter",
    getSubClientFilter = "[Filter] SubClient UpdateFilter",
    getBillStatusFilter = "[Filter] Bill Status UpdateFilter",
    getPageNo = "[Page] UpdatePageNo"
}

export class getClientFilter implements Action {
    public readonly type = EMainPageFilterAction.getClientFilter;
    constructor(public payload: IMainPageFilterState){
    }

}
export class getSubClientFilter implements Action {
    public readonly type = EMainPageFilterAction.getSubClientFilter;
    constructor(public payload: IMainPageFilterState){
    }
}

export class getBillStatusFilter implements Action {
    public readonly type = EMainPageFilterAction.getBillStatusFilter;
    constructor(public payload: IMainPageFilterState){

    }
}

export class getPageNoFilter implements Action {
    public readonly type = EMainPageFilterAction.getPageNo;
    constructor(public payload: IMainPageFilterState){
    }
}

export type MainPageFilterAction = getClientFilter | getSubClientFilter | getBillStatusFilter| getPageNoFilter; 