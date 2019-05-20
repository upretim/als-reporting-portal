import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from  '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {appReducers} from './store/reducers/app.reducer';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import {AuthService} from './services/auth.service';
import {DataService} from './services/data.service';
import { SummaryComponent } from './components/summary/summary.component';
import { ReceivableSummaryComponent } from './components/receivable-summary/receivable-summary.component';
import { ProfitlossComponent } from './components/profitloss/profitloss.component';
import {AddExpensesComponent}  from './components/add-travel/add-expenses.component';
import { ExpensesDetailComponent } from './components/travel-details/expenses-detail.component';
import { NavPanelComponent } from './components/resuable-components/nav-panel/nav-panel.component';
import { AccordianTableViewComponent } from './components/resuable-components/accordian-table-view/accordian-table-view.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    InvoiceComponent,
    InvoiceTableComponent,
    SummaryComponent,
    NavPanelComponent,
    ReceivableSummaryComponent,
    ProfitlossComponent,
    AddExpensesComponent,
    ExpensesDetailComponent,
    AccordianTableViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule,
     ReactiveFormsModule,
     AngularFireAuthModule,
     MatDatepickerModule, 
     MatNativeDateModule,
     BrowserAnimationsModule,
     MatFormFieldModule,
     NgbModule,
     FormsModule,
     HttpClientModule,
     AngularFireDatabaseModule,
     NgxUiLoaderModule,
     NgxPaginationModule,
     MatExpansionModule,
     StoreModule.forRoot(appReducers),
      StoreDevtoolsModule,
      EffectsModule,
      StoreRouterConnectingModule,
     ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    })
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
