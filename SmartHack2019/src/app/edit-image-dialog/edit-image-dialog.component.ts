import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { AppComponent} from '../app.component';

export interface EditImageDialogData 
{
  src: string;
}

@Component({
  selector: 'app-edit-image-dialog',
  templateUrl: './edit-image-dialog.component.html',
  styleUrls: ['./edit-image-dialog.component.css']
})
export class EditImageDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditImageDialogData) {}
    
  ngOnInit() 
  {

  }


}
