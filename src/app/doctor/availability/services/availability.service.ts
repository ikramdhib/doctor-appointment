import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  API_RL="http://localhost:5000/";

  constructor(private http: HttpClient) {}

  createAvailability(doctorID: string, availabilityData: any) {
    return this.http.post<any>(`${this.API_RL}availability/createAvailibility/${doctorID}`, availabilityData);
  }
}
