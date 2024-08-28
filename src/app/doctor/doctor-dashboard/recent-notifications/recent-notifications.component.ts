import { Component } from '@angular/core';
import { NotificationService } from '../../../common/header/notificationServices/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-notifications.component.html',
  styleUrl: './recent-notifications.component.scss'
})
export class RecentNotificationsComponent {
  notifications: any = [];

  constructor(private notificationService: NotificationService) {}
  userId:any;
  ngOnInit(): void {
    if (localStorage.hasOwnProperty('userID')) {
      this.userId = localStorage.getItem('userID');
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    this.notificationService.getRecentNotifications('66c341980ba549287c2d8e49').subscribe(
      data => {
        this.notifications = data;
      },
      error => {
        console.error('Error loading notifications', error);
      }
    );
  }
}
