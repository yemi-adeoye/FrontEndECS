import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EticketListComponent } from './eticket-list.component';

describe('EticketListComponent', () => {
  let component: EticketListComponent;
  let fixture: ComponentFixture<EticketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EticketListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EticketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
