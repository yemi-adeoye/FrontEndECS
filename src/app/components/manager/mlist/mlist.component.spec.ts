import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlistComponent } from './mlist.component';

describe('MlistComponent', () => {
  let component: MlistComponent;
  let fixture: ComponentFixture<MlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
