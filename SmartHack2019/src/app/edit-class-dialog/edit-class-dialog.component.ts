import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { AppComponent} from '../app.component';

export interface EditClassesDialogData 
{
  classes: string;
}

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './edit-class-dialog.component.html',
  styleUrls: ['./edit-class-dialog.component.css']
})
export class EditClassDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditClassesDialogData) {}
    
  ngOnInit() 
  {

  }

}
