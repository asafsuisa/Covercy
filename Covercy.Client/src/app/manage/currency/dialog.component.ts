import {Component, Inject,ViewChild,ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Currency} from '../../models/currency';
@Component({
  selector: 'currency-dialog',
  templateUrl: './dialog.component.html',
  styleUrls :['./dialog.component.css']
})
export class DialogCurrency {
    @ViewChild('f') form :ElementRef
   row: Currency;
   operationType:string;
  constructor(
    public dialogRef: MatDialogRef<DialogCurrency>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}