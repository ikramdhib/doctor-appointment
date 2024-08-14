import { Component } from '@angular/core';

import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { NotificationService } from '../header/notificationServices/notification.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatCardModule,CommonModule,DatePipe,NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notifications: any[] = [];
  userID:any;

  constructor(private notificationService: NotificationService) { 
    this.userID='66b4f44ca1e639b6cb2304fd';
  }

  ngOnInit(): void {
    this.getNotifications(this.userID);
  }

  getNotifications(userID:any): void {
    this.notificationService.getAllUserNotifs(userID).subscribe(
      data => this.notifications = data,
      error => console.error('Error fetching notifications', error)
    );
  }
}
