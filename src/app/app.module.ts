import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HubCommonModule} from './hub-common/hub-common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HubCommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
