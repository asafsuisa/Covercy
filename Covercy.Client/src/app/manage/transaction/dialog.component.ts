import {Component,ViewChild,ElementRef,OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import {Transaction} from '../../models/transaction';
import {Currency} from '../../models/currency';
import {CurrencyService} from '../../services/currency.service';
import {Observable} from 'rxjs';
import {share,debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';
import {BankAccountService} from '../../services/bankAccount.service';
import {Subject} from 'rxjs';
@Component({
  selector: 'transaction-dialog',
  templateUrl: './dialog.component.html',
  styleUrls :['./dialog.component.css']
})
export class DialogTransaction  implements OnInit{
   @ViewChild('f') form :ElementRef
   row: Transaction;
   operationType:string;
   allCurrency:Observable<Currency[]>;
   checkAmountCorrect$ = new Subject<Transaction>();
   isAmmountCorrect:boolean = true;
   ammountLimitation:number;

  constructor(private currencyService:CurrencyService,private bankAccountService:BankAccountService,
    public dialogRef: MatDialogRef<DialogTransaction>) 
    {
        this.allCurrency = this.currencyService.getAllCurrency().pipe(share());


    }
  ngOnInit()
  {
    
        this.checkAmountCorrect$.pipe(debounceTime(300),
            distinctUntilChanged(null,search => JSON.stringify(search)),
            switchMap(search=>this.bankAccountService.checkAmount(this.row.saleCurrency)),share())
            .subscribe(bankAccount=>
            {
              if(bankAccount){
                if (this.row.amount > bankAccount.balance)
                  {
                    this.isAmmountCorrect = false;
                    this.ammountLimitation = bankAccount.balance;
                  }
                  else{
                     this.isAmmountCorrect = true;
                  }
              }
            })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

    checkAmount()
    {
      console.log("sdasdasd")
        if(this.row.amount && this.row.saleCurrency)
          {
            this.checkAmountCorrect$.next(this.row)
          } 
    }
}