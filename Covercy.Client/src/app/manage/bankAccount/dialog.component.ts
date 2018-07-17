import {Component, Inject,ViewChild,ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BankAccount} from '../../models/bankAccount';
import {Currency} from '../../models/currency';
import {CurrencyService} from '../../services/currency.service';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

@Component({
  selector: 'account-dialog',
  templateUrl: './dialog.component.html',
  styleUrls :['./dialog.component.css']
})
export class DialogAccount {
  @ViewChild('f') form :ElementRef
   row: BankAccount;
   operationType:string;
  allCurrency:Observable<Currency[]>;
  constructor(private currencyService:CurrencyService,
    public dialogRef: MatDialogRef<DialogAccount>) {
       this.allCurrency = this.currencyService.getAllCurrency().pipe(share());
    }
    
  onNoClick(): void {
    this.dialogRef.close();
  }
}