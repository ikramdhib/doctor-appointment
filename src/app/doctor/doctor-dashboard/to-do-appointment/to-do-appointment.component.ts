import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { PatientService } from '../../../patient/serves/patient.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-to-do-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-appointment.component.html',
  styleUrl: './to-do-appointment.component.scss'
})
export class ToDoAppointmentComponent {
  todayAppointments: any[] = [];
  buttonEnabledMap: { [appointmentId: string]: boolean } = {};
  timeRemainingMap: { [appointmentId: string]: string } = {};

  constructor(public dialog: MatDialog, private PatientService: PatientService) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('userID')) {
      const doctorID = localStorage.getItem('userID');
      this.PatientService.getTodayAppointments(doctorID).subscribe((appointments: any[]) => {
        this.todayAppointments = appointments;
        this.checkJoinButton();
      });
    }
  }

  checkJoinButton(): void {
    this.todayAppointments.forEach(appointment => {
      if (appointment.type === 'ONLINE') {
        const appointmentTime = new Date(appointment.dateAppointment);
        interval(1000).subscribe(() => {
          const currentTime = new Date();
          const timeDifference = appointmentTime.getTime() - currentTime.getTime();

          if (timeDifference <= 15 * 60 * 1000 && timeDifference > 0) {
            this.buttonEnabledMap[appointment._id] = true;
            this.timeRemainingMap[appointment._id] = this.formatTime(timeDifference);
          } else if (timeDifference > 0) {
            this.buttonEnabledMap[appointment._id] = false;
            this.timeRemainingMap[appointment._id] = this.formatTime(timeDifference);
          } else {
            this.buttonEnabledMap[appointment._id] = false;
            this.timeRemainingMap[appointment._id] = 'Meeting started or ended';
          }
        });
      }
    });
  }

  goToSharedRoom(appointmentId: string): void {
    const sharedRoomLink = `https://meet.jit.si/Appointment${appointmentId}`;
    window.open(sharedRoomLink, "_blank");
  }

  formatTime(timeDifference: number): string {
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${minutes} min ${seconds} sec`;
  }

  
}
