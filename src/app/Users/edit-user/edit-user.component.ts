import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [   
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatRadioGroup,
    FormsModule,
    MatRadioButton,
    CommonModule,
    MatOptionModule,
    MatTableModule,],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
     console.log("data",data)
  }
}
