import { Component } from '@angular/core';
import {Store, select} from '@ngrx/store';
import {IAppState} from './store/state/app.state';
import {MainPageFilter} from '../app/store/selectors/main-page-filter.selectors';
import {getClientFilter} from './store/actions/main-page-filters.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Arth Lab Supplies';
  data$ = this._store.pipe(select(MainPageFilter));
  constructor(private _store:Store<IAppState>){
  }
  ngOninit(){
  // this._store.dispatch(new getClientFilter())
  this.data$.subscribe(data=>{
    console.log("this  is new Data ", data);
  })
 
  }
}
