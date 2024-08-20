import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DoctorServesService } from '../../../doctorServes/doctor-serves.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
import {DialogComponent} from '../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import{AddAppointmentComponent} from '../../../../patient/add-appointment/add-appointment.component';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-t-all',
    standalone: true,
    imports: [MatSnackBarModule,NgIf,CommonModule,DatePipe,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatProgressBarModule],
    templateUrl: './t-all.component.html',
    styleUrl: './t-all.component.scss'
})
export class TAllComponent {
    ELEMENT_DATA : any[] =[] ;
    doctorID:any;
    displayedColumns: string[] = ['patient','appointmentDate','time', 'duration', 'status', 'type' , 'action'];
    dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
 
    constructor( public toster : ToastrService,private DoctorServes: DoctorServesService, private cdr: ChangeDetectorRef ,  public dialog: MatDialog , private snackBar: MatSnackBar) {}
    ngOnInit() {
        if (localStorage.hasOwnProperty('userID')) {
            this.doctorID = localStorage.getItem('userID');
            console.log('doctor id', this.doctorID);
        }
        this.LoadAppointment(this.doctorID);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    LoadAppointment(doctorID: string) {
        this.DoctorServes.getAllAppointments(doctorID).subscribe({
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

    //delet pointment
    deleteAppointmentwithID(appointmentID:any){
        console.log(appointmentID,"zzzzzzzzzzzzzzz")
        this.DoctorServes.deleteAppointmentWithID(appointmentID).subscribe({
            next: (res: any) => {
                this.LoadAppointment(this.doctorID);
            },
            complete: () => {
                this.toster.success("Deleted with success")
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.toster.error("Something went wrong");
                console.error('Erreur:', err);
            }
        });
    }

    deleteAppointment(appointmentID: any): void {
        const dialogRef = this.dialog.open(DialogComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.deleteAppointmentwithID(appointmentID);
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
     this.LoadAppointment(this.doctorID);
     this.cdr.detectChanges();
    }
  });

}
}

