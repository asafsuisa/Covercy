import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule,MatSelectModule, MatSidenavModule, MatIconModule,
  MatSnackBarModule, MatListModule,MatInputModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation';
import {BankAccountComponent} from '../app/manage/bankAccount/bankAccount.component';
import {CurrencyComponent} from '../app/manage/currency/currency.component';
import {CurrencyPairComponent} from '../app/manage/currencyPair/currencyPair.component';
import {TransactionComponent} from '../app/manage/transaction/transactions.component';
import {TableModule} from 'primeng/table';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
/*Dialogs*/ 
import {DialogAccount} from './manage/bankAccount/dialog.component';
import {DialogCurrency} from './manage/currency/dialog.component';
import {DialogCurrencyPair} from './manage/currencyPair/dialog.component';
import {DialogTransaction} from './manage/transaction/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
 /* Services*/
import{BankAccountService} from '../app/services/bankAccount.service';
import{CurrencyService} from '../app/services/currency.service';
import{CurrencyPairService} from '../app/services/currencyPair.service';
import{TransactionService} from '../app/services/transaction.service';
import {GlobalServiceConfiguration} from '../app/services/services';

const appRoutings : Routes=[
    {path:'bankAccount', component: BankAccountComponent},
    {path:'currency', component: CurrencyComponent},
    {path:'currencyPair', component: CurrencyPairComponent},
    {path:'transaction', component: TransactionComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    BankAccountComponent,
    CurrencyComponent,
    DialogAccount,
    DialogCurrency,
    DialogCurrencyPair,
    CurrencyPairComponent,
    DialogTransaction,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutings),
    HttpClientModule,
    TableModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    CustomFormsModule,
    MatSnackBarModule
  ],
  entryComponents:[DialogAccount, DialogCurrency,DialogCurrencyPair,DialogTransaction],
  providers: [BankAccountService,CurrencyService,CurrencyPairService,TransactionService,GlobalServiceConfiguration,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
