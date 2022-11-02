import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleaveListComponent } from './eleave-list.component';

describe('EleaveListComponent', () => {
  let component: EleaveListComponent;
  let fixture: ComponentFixture<EleaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleaveListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
