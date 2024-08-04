import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DoctorServesService {

  API_RL="http://localhost:5000/";

  
  constructor(private http:HttpClient) { }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}
    

  getAllAppointments(doctorID:any){
    const body = { doctorID: doctorID };
   return  this.http.get(`${this.API_RL}appointment/appointments/${doctorID}`,this.httpOptions);
  }

}
