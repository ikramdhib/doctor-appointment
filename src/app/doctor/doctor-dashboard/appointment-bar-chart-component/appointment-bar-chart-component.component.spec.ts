import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBarChartComponentComponent } from './appointment-bar-chart-component.component';

describe('AppointmentBarChartComponentComponent', () => {
  let component: AppointmentBarChartComponentComponent;
  let fixture: ComponentFixture<AppointmentBarChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentBarChartComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentBarChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
