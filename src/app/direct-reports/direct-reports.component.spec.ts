import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsComponent } from './direct-reports.component';

describe('DirectReportsComponent', () => {
  let component: DirectReportsComponent;
  let fixture: ComponentFixture<DirectReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
