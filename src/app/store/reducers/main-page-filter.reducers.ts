import {EMainPageFilterAction, MainPageFilterAction} from '../actions/main-page-filters.actions';
import {IMainPageFilterState, initialMainPageFilterState} from '../state/main-page-filter.state';

export const mainPageFilterReducer = 
     (state = initialMainPageFilterState,     
     action : MainPageFilterAction) : IMainPageFilterState =>  {
         switch (action.type) {
             case EMainPageFilterAction.getClientFilter:
                return action.payload;
            case EMainPageFilterAction.getSubClientFilter:
                return action.payload;
            case EMainPageFilterAction.getPageNo:
                return action.payload;
            case EMainPageFilterAction.getBillStatusFilter:  
                return action.payload;  
             default:
                 return state;
         }
}


