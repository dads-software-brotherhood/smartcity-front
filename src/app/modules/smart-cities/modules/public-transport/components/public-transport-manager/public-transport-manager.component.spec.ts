import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTransportManagerComponent } from './public-transport-manager.component';

describe('PublicTransportManagerComponent', () => {
  let component: PublicTransportManagerComponent;
  let fixture: ComponentFixture<PublicTransportManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTransportManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTransportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
