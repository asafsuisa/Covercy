import { Component, OnInit } from '@angular/core';
import {BankAccountService} from '../../services/bankAccount.service';
import {BankAccount} from '../../models/bankAccount';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogAccount} from './dialog.component';
import {Currency} from '../../models/currency';
import {CurrencyService} from '../../services/currency.service';

@Component({
    selector: 'app-bankAccount',
    templateUrl: './bankAccount.component.html',
    styleUrls: ['./bankAccount.component.css']
})
export class BankAccountComponent implements OnInit {
    allAccounts:BankAccount[];
    selected:BankAccount =null;
    allCurrency:{[id:number]: Currency}={};
    constructor(private currencyService:CurrencyService,
        private bankAccountService:BankAccountService, 
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
     this.bankAccountService.getAllAccounts().subscribe(
        accounts=> 
        {
            this.allAccounts = accounts
            console.log(this.allAccounts)
        });
    }
    onSelectRow(event)
    {
        this.selected =event;
        console.log(this.selected);
    }

    openCreateDialog()
    {
        const dialogRef = this.dialog.open(DialogAccount, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Create';
        dialogRef.componentInstance.row = {} as BankAccount;
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.bankAccountService.createBankAccout(row).subscribe(ans=>this.refresh());
            }
        } )

    }

    openUpdateDialog()
    {
        const dialogRef = this.dialog.open(DialogAccount, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Update';
        dialogRef.componentInstance.row = Object.assign({},this.selected);
        
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.bankAccountService.updateBankAccout(row).subscribe(ans=>this.refresh());
            }
        } )

    }

    openDeleteDialog()
    {
        const dialogRef = this.dialog.open(DialogAccount, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Delete';
        dialogRef.componentInstance.row = Object.assign({},this.selected);
        
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.bankAccountService.deleteBankAccout(row.accountID).subscribe(ans=>this.refresh());
            }
        } )

    }
}
