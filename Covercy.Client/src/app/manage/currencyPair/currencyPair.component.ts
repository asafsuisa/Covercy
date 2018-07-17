import { Component, OnInit } from '@angular/core';
import {CurrencyPairService} from '../../services/currencyPair.service';
import {CurrencyPair} from '../../models/currencyPair';
import {MatDialog} from '@angular/material';
import {DialogCurrencyPair} from './dialog.component';
import {Currency} from '../../models/currency';
import {CurrencyService} from '../../services/currency.service';

@Component({
    selector: 'app-currencyPair',
    templateUrl: './currencyPair.component.html',
    styleUrls: ['./currencyPair.component.css']
})
export class CurrencyPairComponent implements OnInit {
    allcurrencyPair:CurrencyPair[];
    selected:CurrencyPair =null;
    allCurrency:{[id:number]: Currency}={};
    constructor(private currencyPairService:CurrencyPairService, 
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
     this.currencyPairService.getAllCurrencyPair().subscribe(
        currencyPairs=> 
        {
            this.allcurrencyPair = currencyPairs
        });
    }
    onSelectRow(event)
    {
        this.selected =event;
        console.log(this.selected);
    }

    openCreateDialog()
    {
        const dialogRef = this.dialog.open(DialogCurrencyPair, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Create';
        dialogRef.componentInstance.row = {} as CurrencyPair;
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.currencyPairService.createCurrencyPair(row).subscribe(ans=>this.refresh());
            }
        } )

    }

    openUpdateDialog()
    {
        const dialogRef = this.dialog.open(DialogCurrencyPair, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Update';
        dialogRef.componentInstance.row = Object.assign({},this.selected);
        
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.currencyPairService.updateCurrencyPair(row).subscribe(ans=>this.refresh());
            }
        } )

    }

    openDeleteDialog()
    {
        const dialogRef = this.dialog.open(DialogCurrencyPair, {
        width: '700px',autoFocus:false,disableClose:true});
        dialogRef.componentInstance.operationType ='Delete';
        dialogRef.componentInstance.row = Object.assign({},this.selected);
        
        dialogRef.afterClosed().subscribe(row=>
        {
            if (row)
            {
                this.currencyPairService.deleteCurrencyPair(row.saleCurrency,row.buyCurrency).subscribe(ans=>this.refresh());
            }
        } )

    }
}
