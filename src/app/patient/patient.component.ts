import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TodayAppointmentComponent } from "./today-appointment/today-appointment.component";
import {PatientAppointmentsComponent} from './patient-appointments/patient-appointments.component';


@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, RouterLink, TodayAppointmentComponent,PatientAppointmentsComponent],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
  constructor(public dialog: MatDialog) {}

  openAppointmentDialog(appointment: any = null): void {
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '600px',
      data: appointment ? {
        isUpdateMode: true,
        appointmentId: appointment._id,
        appointmentDate: appointment.dateAppointment,
        appointmentMode: appointment.type,
        appointmentTime: appointment.time
      } : {
        isUpdateMode: false,
        appointmentDate: null,
        appointmentMode: null,
        appointmentTime: null
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment processed:', result);
      }
    });
  }

}
