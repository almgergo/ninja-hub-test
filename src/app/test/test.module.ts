import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubCommonModule} from '../hub-common/hub-common.module';
import {TestComponent} from './test/test.component';
import {TestRoutingModule} from './test-routing.module';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {QrTestComponent} from './qr-test/qr-test.component';
import {
  MatButtonModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TestComponent, QrTestComponent],
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
    FormsModule
  ],
  exports: [TestComponent, QrTestComponent]
})
export class TestModule {}
