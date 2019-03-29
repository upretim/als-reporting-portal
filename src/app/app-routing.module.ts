import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {ReceivableSummaryComponent} from './receivable-summary/receivable-summary.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'invoice', component: InvoiceComponent,  canActivate: [AuthGuard]},
  { path: 'summary', component: ReceivableSummaryComponent,  canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
