// https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
//https://ngrx.io/guide/store
import {IMainPageFilterState, initialMainPageFilterState} from '../state/main-page-filter.state';

export interface IAppState {
    mainPageFilterState: IMainPageFilterState
}

export const intitalAppState: IAppState = {
    mainPageFilterState: initialMainPageFilterState
} 

export function getInitialState(): IAppState {
    return intitalAppState;
}