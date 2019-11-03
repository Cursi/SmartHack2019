import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-remove-resource-dialog',
  templateUrl: './remove-resource-dialog.component.html',
  styleUrls: ['./remove-resource-dialog.component.css']
})

export class RemoveResourceDialogComponent implements OnInit {

  isSure = false;

  constructor(public dialogRef: MatDialogRef<AppComponent>) {}
    
  ngOnInit() 
  {

  }
}