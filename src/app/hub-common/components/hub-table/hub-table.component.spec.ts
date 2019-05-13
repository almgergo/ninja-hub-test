import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubTableComponent } from './hub-table.component';

describe('HubTableComponent', () => {
  let component: HubTableComponent;
  let fixture: ComponentFixture<HubTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
