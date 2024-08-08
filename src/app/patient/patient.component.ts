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

  openAppointmentDialog() {
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment created:', result);
        // Handle the result (e.g., send it to the server)
      }
    });
  }

}
