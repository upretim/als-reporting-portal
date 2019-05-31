
import {
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
    Action,
    combineReducers,
    ActionReducerMap,
  } from '@ngrx/store';
  import { InjectionToken } from '@angular/core';
import {IAppState} from '../state/app.state';
import {mainPageFilterReducer} from './main-page-filter.reducers';


// export const appReducers_: ActionReducerMap<IAppState, any>={
//     mainPageFilterState: mainPageFilterReducer
// }

export const appReducers = new InjectionToken<
  ActionReducerMap<IAppState, Action>
>('Root reducers token', {
  factory: () => ({
    mainPageFilterState: mainPageFilterReducer
  }),
});