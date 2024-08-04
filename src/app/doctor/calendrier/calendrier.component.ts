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
@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [FullCalendarModule, MatCardModule, MatButtonModule, MatMenuModule],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent {

  doctorID ="60c72b2f9b1e8a1f10f1e8a1";

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
    eventBackgroundColor: '#ffffff', // Définit une couleur de fond par défaut
    eventBorderColor: '#ffffff', // Définit une couleur de bordure par défaut
    eventTextColor: '#ffffff', // Définit une couleur de texte par défaut
  };


  constructor(private doctorService: DoctorServesService) {  }

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


  handleEventClick(clickInfo: any): void {
    // Gérez le clic sur un événement
    alert(`Event: ${clickInfo.event.title}`);
  }

}
