import { ChangeDetectorRef, Component } from '@angular/core';

import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { NotificationService } from '../header/notificationServices/notification.service';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private notificationService: NotificationService,
    public toster : ToastrService,
    private cdr: ChangeDetectorRef ) { 
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
  deleteNotification(){
    this.notificationService.deleteAll(this.userID).subscribe({
        next: () => {
            this.toster.success('All notifications deleted');
            this.cdr.detectChanges();
          },
          error: () => {
            this.toster.error('Error deleting notifications');
          }
        });
}
}
