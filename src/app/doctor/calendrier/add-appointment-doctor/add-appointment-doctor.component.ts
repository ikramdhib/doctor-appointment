
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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
import { PatientService } from '../../../patient/serves/patient.service';
import  moment from 'moment';
import { DoctorServesService } from '../../doctorServes/doctor-serves.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../common/header/notificationServices/notification.service';

@Component({
  selector: 'app-add-appointment-doctor',
  standalone: true,
  imports: [MatSelectModule,MatButtonToggleModule,ReactiveFormsModule,FormsModule,MatMenuModule,MatCardModule,CommonModule,MatNativeDateModule,MatDatepickerModule,MatButtonModule,MatStepperModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule],
  templateUrl: './add-appointment-doctor.component.html',
  styleUrl: './add-appointment-doctor.component.scss'
})
export class AddAppointmentDoctorComponent {

  appointmentForm: FormGroup;
  times: string[]; 
  selectedTime: string;
  availableTimes: string[] = [];
  appointments :any[];
  doctorID  : any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAppointmentDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public PatientServces : PatientService,
    private cdr: ChangeDetectorRef,
    public DoctorServes : DoctorServesService,
    public toster : ToastrService,
    public notificationService : NotificationService
  ) {
    this.doctorID="66b20b3baefd046b10d57ed6";
    this.appointmentForm = this.fb.group({
      date: [{ value: data.date, disabled: true }, Validators.required],
      mode: ['', Validators.required],
      time: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]] 
    });

    
  }

  ngOnInit(): void {
    const selectedDate = new Date(this.appointmentForm.get('date').value).toISOString().split('T')[0];
    this.getAppointmentsInthSameDate(this.doctorID, selectedDate);
     
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  // Method to generate time slots
generateTimeSlots(start: string, end: string, interval: number, existingAppointments: any[]): string[] {
  const times = [];
  const startTime = new Date(`1970-01-01T${start}:00Z`); // Use 'Z' to set timezone to UTC
  const endTime = new Date(`1970-01-01T${end}:00Z`);

  for (let currentTime = startTime; currentTime <= endTime; currentTime.setMinutes(currentTime.getMinutes() + interval)) {
    const hours = currentTime.getUTCHours().toString().padStart(2, '0');
    const minutes = currentTime.getUTCMinutes().toString().padStart(2, '0');
    const timeSlot = `${hours}:${minutes}`;

    // Filter out occupied times
    const isOccupied = existingAppointments.some(appointment => {
      const appointmentTime = new Date(appointment.dateAppointment);
      const appointmentHours = appointmentTime.getUTCHours().toString().padStart(2, '0');
      const appointmentMinutes = appointmentTime.getUTCMinutes().toString().padStart(2, '0');
      return `${appointmentHours}:${appointmentMinutes}` === timeSlot;
    });

    if (!isOccupied) {
      times.push(timeSlot);
    }
  }

  return times;
}
  getAppointmentsInthSameDate(doctorID: string, date: any): void {
    const dateIsoString = new Date(date).toISOString().split('T')[0];

    this.PatientServces.getAppointmentAvailibilitiesDoctor(doctorID, dateIsoString).subscribe({
      next: (res: any) => {
        this.appointments = res;
        // Update the available times based on existing appointments
        this.times = this.generateTimeSlots('08:00', '18:00', 60, this.appointments);
        this.cdr.detectChanges(); // Force change detection
      },
      complete: () => {
        console.log('Filtered Available Times:', this.times);
      }
    });
  }

 // Method to filter available times
 filterAvailableTimes(): void {
  const selectedDate = new Date(this.appointmentForm.get('date').value).toISOString().split('T')[0];

  this.availableTimes = this.times.filter(time => {
    return !this.appointments.some(appointment => {
      const appointmentDate = new Date(appointment.dateAppointment).toISOString().split('T')[0];
      const appointmentTime = new Date(appointment.dateAppointment).toTimeString().slice(0, 5);
      return appointmentDate === selectedDate && appointmentTime === time;
    });
  });

  // Debugging logs to check the filtered times
  console.log('Times:', this.times);
  console.log('Available Times:', this.availableTimes);
  console.log('Appointments:', this.appointments);
}
// Function to add an appointment
addAppointment(): void {
  if (this.appointmentForm.valid) {
    const formValue = this.appointmentForm.value;
   // const appointmentDateTime = `${formValue.date}T${formValue.time}:00Z`; // Format the date and time in UTC
console.log(this.appointmentForm.get('date').value);
console.log( formValue.time);
console.log(formValue.mode);
console.log(formValue.email);


    this.DoctorServes.scheduleAppointment(
      this.doctorID,
      this.appointmentForm.get('date').value,
      formValue.time,
      formValue.mode,
      formValue.email
    ).subscribe({
      next: (res:any) => {
        console.log('Appointment successfully scheduled.');
        const notification = {
          senderId: this.doctorID,
          recipientId:res.patient,
          appointmentId:res._id,
          message: "You have a new appointment scheduled by your doctor , please be on time !!",
          type:"ADDED"
      }
      this.notificationService.sendNotification(notification);
      },
      error: (err) => {
        this.toster.error("Error scheduling appointment")
        console.error('Error scheduling appointment:', err);
      },
      complete:()=>{
        this.toster.success('Added with success')
        this.dialogRef.close();
      }
    });
  } else {
    console.log('Form is invalid.');
  }
}



}
