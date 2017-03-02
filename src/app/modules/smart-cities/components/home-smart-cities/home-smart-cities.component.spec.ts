import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSmartCitiesComponent } from './home-smart-cities.component';

describe('HomeSmartCitiesComponent', () => {
  let component: HomeSmartCitiesComponent;
  let fixture: ComponentFixture<HomeSmartCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSmartCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSmartCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
