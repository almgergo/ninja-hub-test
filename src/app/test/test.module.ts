import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubCommonModule} from '../hub-common/hub-common.module';
import {TestComponent} from './test/test.component';
import {TestRoutingModule} from './test-routing.module';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {QrTestComponent} from './qr-test/qr-test.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ChartTestComponent} from './chart-test/chart-test.component';
import {MapsTestComponent} from './maps-test/maps-test.component';
import {
  AgmCoreModule,
  AgmPolygon,
  GoogleMapsAPIWrapper,
  MarkerManager,
  PolygonManager
} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {GeolocationService} from './maps-test/geolocation.service';

@NgModule({
  declarations: [
    TestComponent,
    QrTestComponent,
    ChartTestComponent,
    MapsTestComponent
  ],
  imports: [
    CommonModule,
    HubCommonModule,
    TestRoutingModule,
    ZXingScannerModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    FontAwesomeModule,
    AgmCoreModule,
    HttpClientModule
  ],
  exports: [
    TestComponent,
    QrTestComponent,
    ChartTestComponent,
    MapsTestComponent
  ],
  providers: [
    MatDatepickerModule,
    PolygonManager,
    GoogleMapsAPIWrapper,
    GeolocationService
  ]
})
export class TestModule {}
