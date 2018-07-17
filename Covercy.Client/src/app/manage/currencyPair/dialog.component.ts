import {Component, Inject,ViewChild,ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CurrencyPair} from '../../models/currencyPair';
import {Currency} from '../../models/currency';
import {CurrencyService} from '../../services/currency.service';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
@Component({
  selector: 'currencyPair-dialog',
  templateUrl: './dialog.component.html',
  styleUrls :['./dialog.component.css']
})
export class DialogCurrencyPair {
   @ViewChild('f') form :ElementRef
   row: CurrencyPair;
   operationType:string;
   allCurrency:Observable<Currency[]>;
  constructor(private currencyService:CurrencyService,
    public dialogRef: MatDialogRef<DialogCurrencyPair>) {
        this.allCurrency = this.currencyService.getAllCurrency().pipe(share());
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}