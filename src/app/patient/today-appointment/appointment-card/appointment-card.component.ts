import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    NgApexchartsModule
} from "ng-apexcharts";
import { PatientService } from '../../serves/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from '../../add-appointment/add-appointment.component';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule, DatePipe, NgIf],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class AppointmentCardComponent {
  @ViewChild("chart") chart: ChartComponent;

  appointments: any[] = [];
  upcomingAppointments: any[] = []; // To store filtered appointments
  buttonEnabled: boolean = false;
  timeRemaining: string = '';

  constructor(public dialog: MatDialog, 
              private router: Router, 
              public PatientServes: PatientService) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('userID')) {
      const patientID = localStorage.getItem('userID');
      this.PatientServes.getTodayAppointments(patientID).subscribe((appointments: any[]) => {
        this.appointments = appointments;
        this.filterUpcomingAppointments();
        if (this.upcomingAppointments.length > 0) {
          this.checkJoinButton();
        }
      });
    }
  }

  // Filter appointments to only show upcoming ones
  filterUpcomingAppointments(): void {
    const currentTime = new Date();
    this.upcomingAppointments = this.appointments.filter(appointment => {
      const appointmentTime = new Date(appointment.dateAppointment);
      return appointmentTime >= currentTime;
    });
  }

  checkJoinButton(): void {
    this.upcomingAppointments.forEach(appointment => {
      if (appointment.type === 'ONLINE') {
        const appointmentTime = new Date(appointment.dateAppointment);
        interval(1000).subscribe(() => {
          const currentTime = new Date();
          const timeDifference = appointmentTime.getTime() - currentTime.getTime();

          if (timeDifference <= 15 * 60 * 1000 && timeDifference > 0) {
            this.buttonEnabled = true;
            this.timeRemaining = this.formatTime(timeDifference);
          } else if (timeDifference > 0) {
            this.buttonEnabled = false;
            this.timeRemaining = this.formatTime(timeDifference);
          } else {
            this.buttonEnabled = false;
            this.timeRemaining = 'Meeting started or ended';
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

  openAppointmentDialog(appointment: any = null, doctorID: any = null): void {
    let appointmentTime: string | null = null;
    let appointmentDate: string | null = null;

    if (appointment) {
      const dateTime = new Date(appointment.dateAppointment);
      appointmentDate = dateTime.toISOString().split('T')[0];
      appointmentTime = dateTime.toTimeString().split(' ')[0].substring(0, 5);
    }

    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '500px',
      data: appointment ? {
        isUpdateMode: true,
        appointmentId: appointment._id,
        appointmentDate: appointmentDate,
        appointmentMode: appointment.type,
        appointmentTime: appointmentTime,
        doctorID: doctorID
      } : {
        isUpdateMode: false
      }
    });
  }
}
