import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCitiesComponent } from './smart-cities.component';

describe('SmartCitiesComponent', () => {
  let component: SmartCitiesComponent;
  let fixture: ComponentFixture<SmartCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
