import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-details-doctor-model',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './details-doctor-model.component.html',
  styleUrl: './details-doctor-model.component.scss'
})
export class DetailsDoctorModelComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
  public dialogRef: MatDialogRef<DetailsDoctorModelComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
