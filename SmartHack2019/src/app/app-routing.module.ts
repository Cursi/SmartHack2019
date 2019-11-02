import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { AppComponent } from './app.component';
import { IframeTestComponent } from './iframe-test/iframe-test.component';

const routes: Routes = [
    { path: 'access', component: AccessComponent },
    { path: 'iframet', component: IframeTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
