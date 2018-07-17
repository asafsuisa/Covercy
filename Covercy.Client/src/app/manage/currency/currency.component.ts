import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../models/currency';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogCurrency} from './dialog.component';
@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
    allcurrency:Currency[];
    selected:Currency =null;

    constructor(private currencyService:CurrencyService, public dialog: MatDialog) {

     }

    ngOnInit(): void 
    { 
        this.refresh();
    }

    refresh()
    {
     this.currencyService.getAllCurrency().subscribe(
        currencies=> 
        {
            this.allcurrency = currencies
        });
    }
    onSelectRow(event)
    {
        this.selected =event;
        console.log(this.selected);
    }

    openCreateDialog()
    {
        const dialogRef = this.dialog.open(DialogCurrency, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Create';
        dialogRef.componentInstance.row = {} as Currency;
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.currencyService.createCurrency(row).subscribe(ans=>this.refresh());
            }
        } )

    }

    openUpdateDialog()
    {
        const dialogRef = this.dialog.open(DialogCurrency, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Update';
        dialogRef.componentInstance.row = Object.assign({},this.selected);
        
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.currencyService.updateCurrency(row).subscribe(ans=>this.refresh());
            }
        } )

    }

    openDeleteDialog()
    {
        const dialogRef = this.dialog.open(DialogCurrency, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Delete';
        dialogRef.componentInstance.row = Object.assign({},this.selected);
        
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.currencyService.deleteCurrency(row.currencyID).subscribe(ans=>this.refresh());
            }
        } )

    }
}
