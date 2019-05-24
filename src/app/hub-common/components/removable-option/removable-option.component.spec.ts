import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RemovableOptionComponent} from './removable-option.component';

describe('RemovableOptionComponent', () => {
  let component: RemovableOptionComponent;
  let fixture: ComponentFixture<RemovableOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemovableOptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovableOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
