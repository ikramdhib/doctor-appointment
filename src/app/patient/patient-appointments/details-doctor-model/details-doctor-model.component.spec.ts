import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDoctorModelComponent } from './details-doctor-model.component';

describe('DetailsDoctorModelComponent', () => {
  let component: DetailsDoctorModelComponent;
  let fixture: ComponentFixture<DetailsDoctorModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDoctorModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDoctorModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
