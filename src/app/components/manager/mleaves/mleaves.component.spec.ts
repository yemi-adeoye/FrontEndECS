import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MleavesComponent } from './mleaves.component';

describe('MleavesComponent', () => {
  let component: MleavesComponent;
  let fixture: ComponentFixture<MleavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MleavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
