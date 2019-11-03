import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { AppComponent} from '../app.component';

export interface EditStylesDialogData 
{
  styles: any;
  stylesAsString: string;
}

@Component({
  selector: 'app-edit-styles-dialog',
  templateUrl: './edit-styles-dialog.component.html',
  styleUrls: ['./edit-styles-dialog.component.css']
})

export class EditStylesDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditStylesDialogData) 
    {
      console.log(this.data.styles);
      this.data.stylesAsString = JSON.stringify(this.data.styles, null, 2);
    }
    
  ngOnInit() 
  {

  }

}
