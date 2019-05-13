import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubCommonModule} from '../hub-common/hub-common.module';
import {TestComponent} from './test/test.component';
import {TestRoutingModule} from './test-routing.module';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, HubCommonModule, TestRoutingModule],
  exports: [TestComponent]
})
export class TestModule {}
