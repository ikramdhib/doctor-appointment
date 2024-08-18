import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToggleService } from './toggle.service';
import { AuthService } from '../../Auth/services/auth.service';
import { FeathericonsModule } from '../../apps/icons/feathericons/feathericons.module';

import { SocketService } from './socketService/socket.service';
import { NotificationService } from './notificationServices/notification.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, NgClass],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [
        DatePipe
    ]
})
export class HeaderComponent {

    notifications: any[] = [];
    unreadCount:any;
     userId:any; 
    constructor(
        private cdr: ChangeDetectorRef ,
        public toggleService: ToggleService,
        private datePipe: DatePipe,
        private authService: AuthService,
        private router: Router,
        private socketService: SocketService,
        private notificationService: NotificationService,
        public toster : ToastrService

    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

         this.userId = '66b4f44ca1e639b6cb2304fd'; 
    }

    ngOnInit(): void {
        // Écouter les notifications en temps réel via Socket.io
        this.socketService.on('newNotification', (data) => {
          console.log('Nouvelle notification reçue:', data);
          this.notifications.push(data);
          this.unreadCount=this.notifications.length;
        });
       
        this.notificationService.getAllUserNotif(this.userId).subscribe(notifs => {
          this.notifications = notifs;
        });
      }

    
     timeAgo(timestamp: string): string {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInMs = now.getTime() - past.getTime();
    
        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (seconds < 60) return `${seconds} sec ago`;
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hr ago`;
        return `${days} days ago`;
    }
    

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

    // Current Date
    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
    
    onLogout(){
        this.authService.logout();
        this.router.navigate(['/']); 
    }

    markAllNotificationsAsSeen(): void {
       
        this.notificationService.markAsSeen(this.userId).subscribe(
          (response) => {
            console.log(response.message); 
            this.notifications.forEach(notification => notification.seen = true);
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error marking notifications as seen', error);
          }
        );
      }
    decreeseNotifcationNumbert(){
        this.unreadCount=0;
        this.cdr.detectChanges();
    }
   
    
}