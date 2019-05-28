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

@NgModule({
  declarations: [TestComponent, QrTestComponent, ChartTestComponent],
  imports: [
    CommonModule,
    HubCommonModule,
    TestRoutingModule,
    ZXingScannerModule,
    ZXingScannerModule.forRoot(),
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [TestComponent, QrTestComponent, ChartTestComponent],
  providers: [MatDatepickerModule]
})
export class TestModule {}
