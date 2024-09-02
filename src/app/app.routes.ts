import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { AppsComponent } from './apps/apps.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { authGuard } from './Auth/auth.guard';
import {DoctorComponent} from './doctor/doctor.component';
import {AppointmentsComponent} from './doctor/appointments/appointments.component'
import { CalendrierComponent } from './doctor/calendrier/calendrier.component';
import {PatientComponent} from './patient/patient.component';
import{PatientAppointmentsComponent} from './patient/patient-appointments/patient-appointments.component';
import{AvailabilityComponent} from './doctor/availability/availability.component';
import {AvailabilityCalenderComponent} from './doctor/availability/availability-calender/availability-calender.component';
import {AvailabilityTableComponent} from './doctor/availability/availability-table/availability-table.component';
import {NotificationComponent} from './common/notification/notification.component';
import {DoctorCardsComponent} from './doctor/doctor-cards/doctor-cards.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';

export const routes: Routes = [
   

    
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  
  //notifs path
  {path:'notifications', component:NotificationComponent},

  {path:'doctors', component:DoctorCardsComponent},

//doctor routes
   {path:'doctor' , component:DoctorComponent, canActivate: [authGuard],data: { role: ['DOCTOR']} ,
    children:[
        {path:'dashboard',component:DoctorDashboardComponent},
        {path:'appointments',component:AppointmentsComponent},
        {path:'calender',component:CalendrierComponent},
        {path:'availability', component:AvailabilityComponent , 
            children:[
                {path:'calender',component:AvailabilityCalenderComponent},
                {path:'availabilitytTable',component:AvailabilityTableComponent},
            ],
        },
        
    ]
   },

   //Patient routes 
   {path:'patient', component:PatientComponent  , canActivate: [authGuard],data: { role: ['PATIENT']} ,
    children:[
        {path:'appointments',component:PatientAppointmentsComponent},
    ]
   },
  
 
    
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password', component: ResetPasswordComponent},
            {path: 'confirm-email', component: ConfirmEmailComponent},
        ]
    },

    {path: '**', component: NotFoundComponent} 
];