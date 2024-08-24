import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmnetDetailComponent } from './appointmnet-detail.component';

describe('AppointmnetDetailComponent', () => {
  let component: AppointmnetDetailComponent;
  let fixture: ComponentFixture<AppointmnetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmnetDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmnetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
