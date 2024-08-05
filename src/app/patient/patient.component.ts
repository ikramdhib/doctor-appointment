import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [],
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
