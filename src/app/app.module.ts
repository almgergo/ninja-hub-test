import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HubCommonModule} from './hub-common/hub-common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {MatIconModule} from '@angular/material';
import {TestModule} from './test/test.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AgmCoreModule} from '@agm/core';

export function LocaleFactory() {
  return 'en';
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    '/assets/i18n/',
    '.json?cb=' + new Date().getTime()
  );
}

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HubCommonModule,
    TestModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    ZXingScannerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps.key
    })
  ],

  providers: [{provide: LOCALE_ID, useFactory: LocaleFactory}],
  bootstrap: [AppComponent]
})
export class AppModule {}
