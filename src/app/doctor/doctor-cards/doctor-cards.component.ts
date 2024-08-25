import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DoctorServesService } from '../doctorServes/doctor-serves.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddAppointmentComponent } from '../../patient/add-appointment/add-appointment.component';
import  {LoadingSpinnerComponent } from "../../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-doctor-cards',
  standalone: true,
  imports: [LoadingSpinnerComponent,CommonModule],
  templateUrl: './doctor-cards.component.html',
  styleUrl: './doctor-cards.component.scss'
})
export class DoctorCardsComponent {

  @Input() title: string = '';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc';

  constructor(private cdr: ChangeDetectorRef, private doctorService: DoctorServesService, public dialog: MatDialog) { }
  isLoading: boolean = true;
  
  doctors: any[] = [];

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getAllDoctors().subscribe(
      (data:any) => {
        this.doctors = data;
        this.isLoading=false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des docteurs:', error);
        this.isLoading=false;
      }
    );
  }

  openAppointmentDialog(appointment: any = null , doctorID : any =null): void {

    console.log(doctorID,"***************************************")
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '600px',
      data: appointment ? {
        isUpdateMode: true,
        appointmentId: appointment._id,
        appointmentDate: appointment.dateAppointment,
        appointmentMode: appointment.type,
        appointmentTime: appointment.time
      } : {
        isUpdateMode: false,
        appointmentDate: null,
        appointmentMode: null,
        appointmentTime: null,
        doctorID : doctorID
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment processed:', result);
        // Handle the result (e.g., send it to the server)
      }
    });
  }
}
