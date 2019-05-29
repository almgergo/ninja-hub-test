import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapsTestComponent} from './maps-test.component';

describe('MapsTestComponent', () => {
  let component: MapsTestComponent;
  let fixture: ComponentFixture<MapsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapsTestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
