import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonoComponent } from './telefono.component';

describe('TelefonoComponent', () => {
  let component: TelefonoComponent;
  let fixture: ComponentFixture<TelefonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
