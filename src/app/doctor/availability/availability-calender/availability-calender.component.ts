import { Component,ChangeDetectorRef, OnInit, ViewChild, ViewContainerRef, ElementRef, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import FullCalendarComponent
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddAvailabilityComponent } from '../add-availability/add-availability.component';
import { PatientService } from '../../../patient/serves/patient.service';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarOptions } from '@fullcalendar/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenu, MatMenuModule, MatMenuTrigger  } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import {Overlay, OverlayRef, PositionStrategy, ConnectedPosition  } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-availability-calender',
  templateUrl: './availability-calender.component.html',
  standalone: true,
  imports: [MatMenuModule,CommonModule, FullCalendarModule,OverlayModule,PortalModule, MatCardModule, MatButtonModule, MatMenuModule],
  styleUrls: ['./availability-calender.component.scss']
})
export class AvailabilityCalenderComponent implements OnInit {
   @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;
  @ViewChild('contextMenu') contextMenu!: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;
  doctorID: any;
  selectedEvent: any;
  overlayRef!: OverlayRef;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth timeGridWeek'
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.renderEventContent,
    eventClassNames: ['fc-event']
  };

  constructor(private dialog: MatDialog, private patientService: PatientService,
      private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
    this.doctorID = "66b20b3baefd046b10d57ed6";
  }

  ngOnInit() {
    this.loadAvailabilities(this.doctorID);
  }

  getColorByMode(mode: string): string {
    switch (mode) {
      case 'ONLINE':
        return '#007bff'; // Bleu
      case 'IN_PERSON':
        return '#008000'; // Vert
      default:
        return '#686868'; // Couleur par défaut
    }
  }
  

  handleDateClick(arg: any) {
    console.log('Date clicked:', arg.dateStr);
    this.dialog.open(AddAvailabilityComponent, {
      width: '400px',
      data: { date: arg.dateStr }
    }).afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  formatEvents(availabilities: any[]): any[] {
    return availabilities.flatMap(avail =>
      avail.timeSlots.map(slot => {
        const startTime = slot.startTime;
        const endTime = slot.endTime;
        const mode = slot.mode;
        const formattedTitle = `${mode} (${startTime} - ${endTime})`;

        return {
          title: formattedTitle,
          start: new Date(avail.date).toISOString().split('T')[0] + 'T' + startTime + ':00',
          end: new Date(avail.date).toISOString().split('T')[0] + 'T' + endTime + ':00',
          classNames: [`fc-event-${mode}`],
          backgroundColor: this.getColorByMode(mode),
          borderColor: this.getColorByMode(mode),
          textColor: '#ffffff',
        };
      })
    );
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
          overflow: hidden; /* Ajouté pour éviter le débordement du texte */
          white-space: normal; /* Permet le retour à la ligne du texte */
          ">
          ${eventInfo.event.title}
        </div>
      `
    };
  }

  loadAvailabilities(doctorID: any) {
    this.patientService.getdoctorDetailsWithAvailibities(doctorID).subscribe({
      next: (res: any) => {
        const events = this.formatEvents(res.availabilities);
        this.calendarOptions.events = events;

        if (this.calendarComponent) {
          this.calendarComponent.getApi().removeAllEvents(); // Nettoyer les anciens événements
          this.calendarComponent.getApi().addEventSource(events); // Ajouter les nouveaux événements
        }
      },
    });
  }

  handleEventClick(arg: any) {
    this.selectedEvent = arg.event;

    if (!this.overlayRef) {
      const positionStrategy: PositionStrategy = this.overlay.position()
        .flexibleConnectedTo(arg.el)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]);

      this.overlayRef = this.overlay.create({
        positionStrategy,
        hasBackdrop: true,
      });
    }

    const portal = new TemplatePortal(this.contextMenu, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }
  
  editEvent() {
    console.log('Editing event:', this.selectedEvent);
    // Logique pour ouvrir la boîte de dialogue ou rediriger vers la page de modification
  }

  deleteEvent() {
    console.log('Deleting event:', this.selectedEvent);
    // Logique pour confirmer et supprimer l'événement
  }

}
