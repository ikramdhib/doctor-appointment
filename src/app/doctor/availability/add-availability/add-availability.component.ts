import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AvailabilityService } from '../services/availability.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-availability',
  standalone: true,
  imports: [
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatCardModule,
    CommonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-availability.component.html',
  styleUrls: ['./add-availability.component.scss']
})
export class AddAvailabilityComponent {
  availabilityForm: FormGroup;
  doctorID:any;

  times: string[] = [
    '08:00', '09:00',  '10:00',
     '11:00', '12:00',
    '13:00',  '14:00',  '15:00',
    '16:00', '17:00', 
    '18:00'
  ];

  constructor(
    public dialogRef: MatDialogRef<AddAvailabilityComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { date: string } ,
    public AvvailabilityService : AvailabilityService,
    public toaster : ToastrService,
  ) {
    this.doctorID="66b20b3baefd046b10d57ed6";
    this.availabilityForm = this.fb.group({
      onlineChecked: [false],
      onlineStartTime: [''],
      onlineEndTime: [''],
      inPersonChecked: [false],
      inPersonStartTime: [''],
      inPersonEndTime: ['']
    });
  }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.availabilityForm.invalid) {
      return; // Ignore invalid form
    }

    const formValue = this.availabilityForm.value;
    const availabilityData = {
      date: this.data.date,
      timeSlots: []
    };

    if (formValue.onlineChecked) {
      availabilityData.timeSlots.push({
        startTime: formValue.onlineStartTime,
        endTime: formValue.onlineEndTime,
        isAvailable: true,
        mode: 'ONLINE'
      });
    }

    if (formValue.inPersonChecked) {
      availabilityData.timeSlots.push({
        startTime: formValue.inPersonStartTime,
        endTime: formValue.inPersonEndTime,
        isAvailable: true,
        mode: 'IN_PERSON'
      });
    }

    this.AvvailabilityService.createAvailability(this.doctorID, availabilityData)
      .subscribe(response => {
        this.toaster.success('Availability created')
        this.dialogRef.close(response);
      }, error => {
        this.toaster.error('Error creating availability')
      });
  }

 
}
