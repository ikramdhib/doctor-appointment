import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    NgApexchartsModule
} from "ng-apexcharts";
import { PatientService } from '../../serves/patient.service';
import { MatDialog } from '@angular/material/dialog';
import{AddAppointmentComponent} from '../../add-appointment/add-appointment.component';
import { interval } from 'rxjs';
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
    imports: [NgApexchartsModule,DatePipe,NgIf],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class AppointmentCardComponent {
  @ViewChild("chart") chart: ChartComponent;
  
  patientID: any;
  appointment: any;
  buttonEnabled: boolean = false;
  timeRemaining: string = '';

  constructor(public dialog: MatDialog, public PatientServes: PatientService) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('userID')) {
      this.patientID = localStorage.getItem('userID');
    }

    this.PatientServes.getTodayAppointments(this.patientID).subscribe((appointments: any[]) => {
      if (appointments.length > 0) {
        this.appointment = appointments[0]; // Prenez le premier rendez-vous
        this.checkJoinButton();
      }
    });
  }

  checkJoinButton(): void {
    if (this.appointment && this.appointment.type === 'ONLINE') {
      const appointmentTime = new Date(this.appointment.dateAppointment);
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
  }

  formatTime(timeDifference: number): string {
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${minutes} min ${seconds} sec`;
  }

  openAppointmentDialog(appointment: any = null, doctorID :any = null): void {
    let appointmentTime: string | null = null;
    let appointmentDate: string | null = null;

    if (appointment) {
      const dateTime = new Date(appointment.dateAppointment);
      appointmentDate = dateTime.toISOString().split('T')[0];
      appointmentTime = dateTime.toTimeString().split(' ')[0].substring(0, 5);
    }

    console.log(doctorID);
    

    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '500px',
      data: appointment ? {
        isUpdateMode: true,
        appointmentId: appointment._id,
        appointmentDate: appointmentDate,
        appointmentMode: appointment.type,
        appointmentTime: appointmentTime,
        doctorID:doctorID
      } : {
        isUpdateMode: false
      }
    });
  }
}
