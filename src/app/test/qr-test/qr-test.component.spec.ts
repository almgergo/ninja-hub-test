import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QrTestComponent} from './qr-test.component';

describe('QrTestComponent', () => {
  let component: QrTestComponent;
  let fixture: ComponentFixture<QrTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrTestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
