import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { CalendarOptions } from '@fullcalendar/core';
import { DoctorServesService } from '../doctorServes/doctor-serves.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {AddAppointmentDoctorComponent} from './add-appointment-doctor/add-appointment-doctor.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [FullCalendarModule, MatCardModule, MatButtonModule, MatMenuModule],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent {

  doctorID ="66b20b3baefd046b10d57ed6";

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth', // Vue par défaut
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'long' }
      },
      timeGridWeek: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
      },
      timeGridDay: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
      }
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [], // Les événements seront ajoutés ici
    eventContent: this.renderEventContent,
    dateClick: this.handleDateClick.bind(this),
  };


  constructor(private doctorService: DoctorServesService , public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.loadAppointments(this.doctorID);
  }

  loadAppointments(doctorID:any): void {
    this.doctorService.getAllAppointments(doctorID).subscribe((appointments: any[]) => {
      this.calendarOptions.events = appointments.map(appointment => ({
        title: `${appointment.type} (${this.formatTime(new Date(appointment.dateAppointment))})`,
        start: new Date(appointment.dateAppointment).toISOString(),
        backgroundColor: this.getColorByStatus(appointment.status),
        borderColor: this.getColorByStatus(appointment.status),
        textColor: '#ffffff' // Couleur du texte
      }));
    });
  }


  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  renderEventContent(eventInfo: any): any {
    return {
      html: `
        <div style="
          background-color: ${eventInfo.event.backgroundColor};
          border-radius: 6px;
          color: ${eventInfo.event.textColor};
          padding: 5px;
          font-size: 12px;
          text-align: center;
          ">
          ${eventInfo.event.title}
        </div>
      `
    };
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'PLANIFIED':
        return '#007bff'; // Bleu
      case 'FINISHED':
        return '#28a745'; // Vert
      case 'CANCLED':
        return '#dc3545'; // Rouge
      case 'UNPLANNED':
        return '#6c757d'; // Gris
      default:
        return '#007bff'; // Bleu par défaut
    }
  }


  handleDateClick(arg: any): void {
    const dialogRef = this.dialog.open(AddAppointmentDoctorComponent, {
      width: '300px',
      data: { date: arg.dateStr }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle saving the appointment here
        console.log('The appointment was saved with the following details:', result);
      }
    });
  }


}
