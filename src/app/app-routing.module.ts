import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CustomerAccountComponent } from './pages/customer-account/customer-account.component';
import { EodReportComponent } from './pages/eod-report/eod-report.component';
import { TellerTransactionComponent } from './pages/teller-transaction/teller-transaction.component';
import { DetailsComponent } from './pages/customer-account/details/details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent, children: [
      {path: 'accounts', component: CustomerAccountComponent},
      {path: 'accounts/:id', component: DetailsComponent},
      {path: 'eod-reports', component: EodReportComponent},
      {path: 'transactions', component: TellerTransactionComponent},
      { path: '', redirectTo: 'accounts', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
