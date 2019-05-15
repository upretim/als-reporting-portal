import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import {ReceivableSummaryComponent} from './components/receivable-summary/receivable-summary.component';
import {AuthGuard} from './guards/auth.guard';
import { ProfitlossComponent } from './components/profitloss/profitloss.component';
import { AddExpensesComponent } from './components/add-travel/add-expenses.component';
import { ExpensesDetailComponent } from './components/travel-details/expenses-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'invoice', component: InvoiceComponent,  canActivate: [AuthGuard]},
  { path: 'summary', component: ReceivableSummaryComponent,  canActivate: [AuthGuard]},
  { path: 'PLStatus', component: ProfitlossComponent,  canActivate: [AuthGuard]},
  { path: 'add-travel', component: AddExpensesComponent,  canActivate: [AuthGuard]},
  { path: 'expense-details', component: ExpensesDetailComponent,  canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
