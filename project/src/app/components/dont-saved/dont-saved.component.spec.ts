import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DontSavedComponent } from './dont-saved.component';

describe('DontSavedComponent', () => {
  let component: DontSavedComponent;
  let fixture: ComponentFixture<DontSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DontSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DontSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
