import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DoctorServesService } from '../../../doctorServes/doctor-serves.service';
import { CommonModule, DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from '../../../dialog/dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../../common/header/notificationServices/notification.service';
@Component({
    selector: 'app-t-in-progress',
    standalone: true,
    imports: [MatTooltipModule,NgIf,CommonModule, DatePipe,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatProgressBarModule],
    templateUrl: './t-in-progress.component.html',
    styleUrl: './t-in-progress.component.scss'
})
export class TInProgressComponent {

    ELEMENT_DATA : any[] =[] ;
    status="UNPLANNED";
    doctorID ="66b20b3baefd046b10d57ed6";
    displayedColumns: string[] = ['patient','appointmentDate','time', 'duration', 'status', 'type' , 'action'];
    dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
 
    constructor(public toster : ToastrService,private DoctorServes: DoctorServesService,
        public notificationService : NotificationService,
        private cdr: ChangeDetectorRef ,public dialog: MatDialog , private snackBar: MatSnackBar) {}
    ngOnInit() {
        this.LoadAppointment(this.doctorID, this.status);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    LoadAppointment(doctorID: string , status :string) {
        this.DoctorServes.getAllAppointmentswithstatus(doctorID,status).subscribe({
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
   

      //confirm appointment 
      updateAppointmentStatus(appointmentID:any , appointmentStatus:any){
        this.DoctorServes.updateAppointmentStatus(appointmentID,appointmentStatus).subscribe({
            next: (res: any) => {
                this.LoadAppointment(this.doctorID , this.status);
                if(appointmentStatus=='CANCLED'){
                    const notification = {
                        senderId: this.doctorID,
                        recipientId:res.patient,
                        appointmentId:appointmentID,
                        message: "Your appointment is cancel by your doctor , please take another appointment or contact your doctor",
                        type:"CANCELED"
                    }
                    this.notificationService.sendNotification(notification);
                }else if(appointmentStatus=='PLANIFIED'){
                    const notification = {
                        senderId: this.doctorID,
                        recipientId:res.patient,
                        appointmentId:appointmentID,
                        message: "Your appointment is confirmed by your doctor , please be on time !!",
                        type:"CONFIRMED"
                    }
                    this.notificationService.sendNotification(notification);
                }
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


}
