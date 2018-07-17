import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from '../../models/transaction';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogTransaction} from './dialog.component';
import {Currency} from '../../models/currency';
import {CurrencyService} from '../../services/currency.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css']
})
export class TransactionComponent implements OnInit {
    alltransaction:Transaction[];
    selected:Transaction =null;

    allCurrency:{[id:number]: Currency}={};
    constructor(private transactionService:TransactionService, 
        private currencyService:CurrencyService,
        public dialog: MatDialog) 
    {
        this.currencyService.getAllCurrency().subscribe(currencyAns=>
        {
            currencyAns.forEach(element=>this.allCurrency[element.currencyID] = element);
        })
     }

    ngOnInit(): void 
    { 
        this.refresh();
    }

    refresh()
    {
     this.transactionService.getAllTransactions().subscribe(
        trans=> 
        {
            this.alltransaction = trans
        });
    }
    onSelectRow(event)
    {
        this.selected =event;
        console.log(this.selected);
    }

    openCreateDialog()
    {
        const dialogRef = this.dialog.open(DialogTransaction, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Create';
        dialogRef.componentInstance.row = {} as Transaction;
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.transactionService.createTransaction(row).subscribe(ans=>this.refresh());
            }
        } )

    }



}
