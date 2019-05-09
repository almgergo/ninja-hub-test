import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HubCommonModule} from './hub-common/hub-common.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HubCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
