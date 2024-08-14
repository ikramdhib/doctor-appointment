import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000'); // Remplacez par l'URL de votre serveur Node.js
  }

  // Méthode pour écouter un événement
  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  // Méthode pour émettre un événement
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Méthode pour déconnecter le socket
  disconnect(): void {
    this.socket.disconnect();
  }
}
