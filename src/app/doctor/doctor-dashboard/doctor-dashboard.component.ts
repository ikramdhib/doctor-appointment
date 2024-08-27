import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ToDoAppointmentComponent } from './to-do-appointment/to-do-appointment.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [ToDoAppointmentComponent,MatCardModule,RouterLink],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {

}
