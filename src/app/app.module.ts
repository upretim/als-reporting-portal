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
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from  '@angular/common/http';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import {AuthService} from './auth.service';
import {DataService} from './data.service';
import { SummaryComponent } from './summary/summary.component';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { ReceivableSummaryComponent } from './receivable-summary/receivable-summary.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import {AddExpensesComponent}  from './add-expenses/add-expenses.component';
import { ExpensesDetailComponent } from './expenses-detail/expenses-detail.component';



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
    ExpensesDetailComponent
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
     ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    })
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
