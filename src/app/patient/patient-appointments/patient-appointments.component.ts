import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { PatientService } from '../serves/patient.service';
import { CommonModule, DatePipe } from '@angular/common';
import {DetailsDoctorModelComponent} from './details-doctor-model/details-doctor-model.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorServesService } from '../../doctor/doctorServes/doctor-serves.service';
import { ToastrService } from 'ngx-toastr';
import {AddAppointmentComponent} from '../add-appointment/add-appointment.component';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule
import { NotificationService } from '../../common/header/notificationServices/notification.service';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
    imports: [MatTooltipModule,DatePipe,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.scss'
})
export class PatientAppointmentsComponent {
  ELEMENT_DATA : any[] =[] ;
  patientID :any;
  displayedColumns: string[] = [ 'doctor', 'appointmentDate', 'time', 'type', 'status','action'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public toster : ToastrService,public DoctorServes : DoctorServesService, 
    public notificationService :  NotificationService,
     public dialog: MatDialog ,private PatientServes: PatientService, private cdr: ChangeDetectorRef ) {}

  ngOnInit() {
    if (localStorage.hasOwnProperty('userID')) {
      this.patientID = localStorage.getItem('userID');
      console.log('patient id', this.patientID);
  }
    this.LoadAppointment(this.patientID);
}
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }


  LoadAppointment(patientID: string) {
    this.PatientServes.getAllAppointments(patientID).subscribe({
        next: (res: any) => {
            this.ELEMENT_DATA = res;
            this.dataSource.data = this.ELEMENT_DATA;
            console.log(res);
        },
        complete: () => {
            console.log("complete");
            this.cdr.detectChanges();
        },
        error: (err) => {
            console.error('Erreur:', err);
        }
    });
}

convertToUTCTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().substring(11, 16); // Extract time in HH:mm format
}

openDoctorDetails(element: any): void {
  this.dialog.open(DetailsDoctorModelComponent, {
    width: '400px',
    data: {
      doctor: {
        ...element.doctor,
        profileImageUrl: 'assets/images/courses/course22.jpg' // ou l'URL de l'image du profil
      }
    }
  });
}

updateAppointmentStatus(appointmentID:any){
  this.PatientServes.cancelAppointment(appointmentID).subscribe({
      next: (res: any) => {
          this.LoadAppointment(this.patientID);
          const notification = {
            senderId: res.patient,
            recipientId:res.doctor,
            appointmentId:appointmentID,
            message: "Your appointment is canceled , you can contact your patient ",
            type:"CANCELED"
        }
        this.notificationService.sendNotification(notification).subscribe({
          next:(res:any)=>{
            console.log("success");
            
          }
        });
      },
      complete: () => {
          this.toster.success('Changed with success');
          this.cdr.detectChanges();
      },
      error: (err) => {
          this.toster.error('Erreur when updating');
          console.error('Erreur:', err);
      }
  });
}


openAppointmentDialog(appointment: any = null): void {
  let appointmentTime: string | null = null;
let appointmentDate: string | null = null;

if (appointment) {
const dateTime = new Date(appointment.dateAppointment);
// Formater la date et l'heure
appointmentDate = dateTime.toISOString().split('T')[0]; // 'YYYY-MM-DD'
appointmentTime = dateTime.toTimeString().split(' ')[0].substring(0, 5); // 'HH:MM'
}

const dialogRef = this.dialog.open(AddAppointmentComponent, {
width: '500px',
data: appointment ? {
  isUpdateMode: true,
  appointmentId: appointment._id,
  appointmentDate: appointmentDate,
  appointmentMode: appointment.type,
  appointmentTime: appointmentTime
} : {
  isUpdateMode: false
}
});
dialogRef.afterClosed().subscribe(result => {
  if (result) {
    console.log('Appointment processed:', result);
   this.LoadAppointment(this.patientID);
   this.cdr.detectChanges();
  }
});

}

}

