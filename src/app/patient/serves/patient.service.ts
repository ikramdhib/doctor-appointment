import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  API_RL="http://localhost:5000/";

  
  constructor(private http:HttpClient) { }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  getdoctorDetailsWithAvailibities(id:any){
   return  this.http.get(`${this.API_RL}appointment/getuserDetails/${id}`,this.httpOptions);
  }
  createAppointment(dateTime:any,hourAppointment:any,type:any,doctor:any,patient:any){
    return  this.http.post(`${this.API_RL}appointment/createAppointment`,{
      dateTime: dateTime,
      hourAppointment:hourAppointment,
      type: type,
      doctor:doctor , 
      patient: patient
    });
  }
  getAllAppointments(patientID:any){
    return this.http.get(`${this.API_RL}appointment/patientAppointments/${patientID}`,this.httpOptions);
  }
  getTodayAppointments(patientID:any){
    return this.http.get(`${this.API_RL}appointment/todayAppointment/${patientID}`,this.httpOptions);

  }
}
