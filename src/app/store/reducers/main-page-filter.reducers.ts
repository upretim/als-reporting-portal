import {EMainPageFilterAction, MainPageFilterAction} from '../actions/main-page-filters.actions';
import {IMainPageFilterState, initialMainPageFilterState} from '../state/main-page-filter.state';

export const mainPageFilterReducer = 
     (state = initialMainPageFilterState,     
     action : MainPageFilterAction) : IMainPageFilterState =>  {
         switch (action.type) {
             case EMainPageFilterAction.getClientFilter:
                 console.log('this is payload  getClientFilter ', action.payload);
                return action.payload;
            case EMainPageFilterAction.getSubClientFilter:
                 console.log('this is payload getSubClientFilter ', action.payload);
                return action.payload;
            case EMainPageFilterAction.getPageNo:
                 console.log('this is payload getSubClientFilter ', action.payload);
                return action.payload;
            case EMainPageFilterAction.getBillStatusFilter:  
                console.log('this is payload  getBillStatusFilter ', action.payload);
                return action.payload;  
             default:
                 return state;
         }
}


