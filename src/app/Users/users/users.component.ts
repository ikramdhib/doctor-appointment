import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../../models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
    dialog = inject(MatDialog);

  userSer = inject(UserService);
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = [
    'email',
    'firstname',
    'lastname',
    'role',
    'isActive',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.userSer.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data.map(user => ({
            ...user,
            action: {
              edit: 'edit',  // Replace with actual edit icon class
              delete: 'delete'  // Replace with actual delete icon class
            }
          }));
          this.dataSource.data = this.users;  // Update the dataSource with the new data
        console.log("response", data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  openDialog(element): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: {
        firstname: element.firstname,
        id: element._id,
        lastname: element.lastname,
        email: element.email,
        role: element.role,
        isActive:element.isActive
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(); 
      }
    });
  }
}
