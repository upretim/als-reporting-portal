import {createSelector, createFeatureSelector} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {IMainPageFilterState} from  '../state/main-page-filter.state';

export const mainPageFilterSelector = (state:IAppState) => state.mainPageFilterState;

export const MainPageFilter = createSelector(
    mainPageFilterSelector,
    (state: IMainPageFilterState)=> state.invfilter
)

export const pageNo = createSelector(
    mainPageFilterSelector,
    (state: IMainPageFilterState)=> state.pageNo
)