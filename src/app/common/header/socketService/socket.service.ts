import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor( public toster : ToastrService) {
    this.socket = io('http://localhost:5000'); 
  }

  
  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
    this.toster.success(data.message)
  }

  
  disconnect(): void {
    this.socket.disconnect();
  }
}
