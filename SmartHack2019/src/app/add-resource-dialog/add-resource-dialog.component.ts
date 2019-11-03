import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-add-resource-dialog',
  templateUrl: './add-resource-dialog.component.html',
  styleUrls: ['./add-resource-dialog.component.css']
})
export class AddResourceDialogComponent implements OnInit {

  resourceData = 
  {
    text : "",
    type : "1"
  }
  constructor(public dialogRef: MatDialogRef<AppComponent>) {}
    
  ngOnInit() 
  {
    
  }

}
