import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { DoctorServesService } from '../../../doctorServes/doctor-serves.service';
import { DialogComponent } from '../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-t-finished',
    standalone: true,
    imports: [NgIf,CommonModule, DatePipe,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatProgressBarModule],
    templateUrl: './t-finished.component.html',
    styleUrl: './t-finished.component.scss'
})
export class TFinishedComponent {
    ELEMENT_DATA : any[] =[] ;
    status="FINISHED";
    doctorID ="66b20b3baefd046b10d57ed6";
    displayedColumns: string[] = ['patient','appointmentDate','time', 'duration', 'status', 'type' , 'action'];
    dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
 
    constructor(public toster : ToastrService,private DoctorServes: DoctorServesService, private cdr: ChangeDetectorRef,public dialog: MatDialog , private snackBar: MatSnackBar) {}
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

     //delet pointment
     deleteAppointmentwithID(appointmentID:any){
        console.log(appointmentID,"zzzzzzzzzzzzzzz")
        this.DoctorServes.deleteAppointmentWithID(appointmentID).subscribe({
            next: (res: any) => {
                this.LoadAppointment(this.doctorID , this.status);
            },
            complete: () => {
                this.toster.success('Deleted with success')
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.toster.error('Something went wrong')
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
}

