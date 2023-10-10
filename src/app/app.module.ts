import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerAccountComponent } from './pages/customer-account/customer-account.component';
import { TellerTransactionComponent } from './pages/teller-transaction/teller-transaction.component';
import { EodReportComponent } from './pages/eod-report/eod-report.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailsComponent } from './pages/customer-account/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerAccountComponent,
    TellerTransactionComponent,
    EodReportComponent,
    SideNavComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
    LoaderComponent,
    HeaderComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
