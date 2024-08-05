import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../apps/icons/feathericons/feathericons.module';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [FeathericonsModule,FileUploadModule,MatSelectModule,NgxEditorModule,FormsModule,RouterLink,MatMenuModule,MatCardModule,ReactiveFormsModule,CommonModule,MatDialogModule,MatStepperModule,MatButtonModule,MatDatepickerModule,MatFormFieldModule,MatInputModule, MatRadioModule,MatNativeDateModule],
  templateUrl: './add-appointment.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-appointment.component.scss'
})
export class AddAppointmentComponent {



  typeFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  minDate: Date;
  availableTimes: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  selectedTime: string;

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddAppointmentComponent>) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.typeFormGroup = this._formBuilder.group({
      type: ['', Validators.required]
    });
    this.dateFormGroup = this._formBuilder.group({
      date: ['', Validators.required]
    });
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.dateFormGroup.get('time').setValue(time); // Ensure form validity
  }

  submit() {
    if (this.typeFormGroup.valid && this.dateFormGroup.valid) {
      const appointmentDetails = {
        type: this.typeFormGroup.get('type').value,
        date: this.dateFormGroup.get('date').value,
        time: this.selectedTime
      };
      // Send the appointmentDetails to the server or process them as needed
      console.log('Appointment Details:', appointmentDetails);
      this.dialogRef.close(appointmentDetails);
    }
  }
  selectAppointmentType(type: string): void {
    this.typeFormGroup.get('type').setValue(type);
  }

  

}
