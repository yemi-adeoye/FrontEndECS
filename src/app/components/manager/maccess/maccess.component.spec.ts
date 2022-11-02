import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaccessComponent } from './maccess.component';

describe('MaccessComponent', () => {
  let component: MaccessComponent;
  let fixture: ComponentFixture<MaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
