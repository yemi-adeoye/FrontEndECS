import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EprofileComponent } from './eprofile.component';

describe('EprofileComponent', () => {
  let component: EprofileComponent;
  let fixture: ComponentFixture<EprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
