import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { AppsComponent } from './apps/apps.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { TablesComponent } from './tables/tables.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { authGuard } from './Auth/auth.guard';
import { UsersComponent } from './Users/users/users.component';
import { UiElementsComponent} from './ui-elements/ui-elements.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    { path: 'ecommerce', component: EcommerceComponent ,canActivate: [authGuard],data: { role: ['ADMIN'] }}, 

    
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {
        path: 'apps',
        component: AppsComponent,
        children: [
            {path: 'users', component: UsersComponent},

        ]
    },

  //add : 
  {path :'ui-element', component:UiElementsComponent},


   
  
    {path: 'tables', component: TablesComponent},


    {
        path: 'users',
        component: UsersPageComponent,
        children: [
            {path: '', component: TeamMembersComponent},
            {path: 'users-list', component: UsersListComponent},
            {path: 'add-user', component: AddUserComponent},
        ]
    },

    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
       
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