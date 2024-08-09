
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-appointment-doctor',
  standalone: true,
  imports: [MatSelectModule,MatButtonToggleModule,ReactiveFormsModule,FormsModule,MatMenuModule,MatCardModule,CommonModule,MatNativeDateModule,MatDatepickerModule,MatButtonModule,MatStepperModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule],
  templateUrl: './add-appointment-doctor.component.html',
  styleUrl: './add-appointment-doctor.component.scss'
})
export class AddAppointmentDoctorComponent {

  appointmentForm: FormGroup;
  times: string[]; // Initialize as an empty array
  selectedTime: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAppointmentDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentForm = this.fb.group({
      date: [{ value: data.date, disabled: true }, Validators.required],
      mode: ['', Validators.required],
      time: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]] 
    });

    // Generate time slots from 8 AM to 6 PM
    this.times = this.generateTimeSlots('08:00', '18:00',60); // 30-minute intervals
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Method to generate time slots
  generateTimeSlots(start: string, end: string, interval: number): string[] {
    const times = [];
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    for (let currentTime = startTime; currentTime <= endTime; currentTime.setMinutes(currentTime.getMinutes() + interval)) {
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
    }

    return times;
  }

}
