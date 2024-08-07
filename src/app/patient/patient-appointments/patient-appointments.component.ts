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

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
    imports: [DatePipe,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.scss'
})
export class PatientAppointmentsComponent {
  ELEMENT_DATA : any[] =[] ;
  patientID ="60c72b2f9b1e8a1f10f1e8a2";
  displayedColumns: string[] = [ 'doctor', 'appointmentDate', 'time', 'type', 'status'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private PatientServes: PatientService, private cdr: ChangeDetectorRef ) {}

  ngOnInit() {
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


}

