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
    public chartOptions: Partial<ChartOptions>;

    patientID:any;
    appointment: any;

    constructor(public PatientServes : PatientService) {
    }

    ngOnInit(): void {
      this.patientID = '66afd28847bfaee53e8d6a56'; // Remplacez par l'ID du patient actuel
      this.PatientServes.getTodayAppointments(this.patientID).subscribe((appointments: any[]) => {
        if (appointments.length > 0) {
          this.appointment = appointments[0]; // Prenez le premier rendez-vous, si plusieurs, adaptez selon votre logique
        }
      });

    }
}
