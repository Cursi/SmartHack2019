import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EditTextDialogComponent } from './edit-text-dialog/edit-text-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AccessComponent } from './access/access.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { IframeTestComponent } from './iframe-test/iframe-test.component';
import { AddVersionDialogComponent } from './add-version-dialog/add-version-dialog.component';
import { EditClassDialogComponent } from './edit-class-dialog/edit-class-dialog.component';
import { EditStylesDialogComponent } from './edit-styles-dialog/edit-styles-dialog.component';
import { EditImageDialogComponent } from './edit-image-dialog/edit-image-dialog.component';
import { AddResourceDialogComponent } from './add-resource-dialog/add-resource-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { RemoveResourceDialogComponent } from './remove-resource-dialog/remove-resource-dialog.component';     

@NgModule({
  declarations: [
    AppComponent,
    EditTextDialogComponent,
    AccessComponent,
    IframeTestComponent,
    AddVersionDialogComponent,
    EditClassDialogComponent,
    EditStylesDialogComponent,
    EditImageDialogComponent,
    AddResourceDialogComponent,
    RemoveResourceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:
  [
    EditTextDialogComponent,
    EditClassDialogComponent,
    EditStylesDialogComponent,
    EditImageDialogComponent,
    AddResourceDialogComponent,
    AddVersionDialogComponent,
    RemoveResourceDialogComponent
  ]
})
export class AppModule { }