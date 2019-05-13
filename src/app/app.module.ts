import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HubCommonModule} from './hub-common/hub-common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TestModule} from './test/test.module';

export function LocaleFactory() {
  return 'en';
}

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HubCommonModule,
    TestModule,
    MatIconModule
  ],
  providers: [{provide: LOCALE_ID, useFactory: LocaleFactory}],
  bootstrap: [AppComponent]
})
export class AppModule {}
