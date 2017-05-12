import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountGroupComponent } from './user-account-group.component';

describe('UserAccountGroupComponent', () => {
  let component: UserAccountGroupComponent;
  let fixture: ComponentFixture<UserAccountGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
