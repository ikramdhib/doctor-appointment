import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import{WorkHoursChartComponent} from './work-hours-chart/work-hours-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ToDoAppointmentComponent } from './to-do-appointment/to-do-appointment.component';
import { AppointmentBarChartComponentComponent } from'./appointment-bar-chart-component/appointment-bar-chart-component.component'
@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [WorkHoursChartComponent,ToDoAppointmentComponent,MatCardModule,RouterLink,AppointmentBarChartComponentComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {

}
