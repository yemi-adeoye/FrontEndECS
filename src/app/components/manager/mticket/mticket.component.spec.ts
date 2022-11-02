import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MticketComponent } from './mticket.component';

describe('MticketComponent', () => {
  let component: MticketComponent;
  let fixture: ComponentFixture<MticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
