import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadProjectLocationComponent } from './aad-project-location.component';

describe('AadProjectLocationComponent', () => {
  let component: AadProjectLocationComponent;
  let fixture: ComponentFixture<AadProjectLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadProjectLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadProjectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
