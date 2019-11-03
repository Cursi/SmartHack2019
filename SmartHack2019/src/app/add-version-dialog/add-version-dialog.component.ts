import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { AppComponent} from '../app.component';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-version-dialog',
  templateUrl: './add-version-dialog.component.html',
  styleUrls: ['./add-version-dialog.component.css']
})
export class AddVersionDialogComponent implements OnInit 
{
  constructor(
    public dialogRef: MatDialogRef<AppComponent>, private firebaseService: FirebaseService) {}
    
  ngOnInit() {}

  versionName = "";
}