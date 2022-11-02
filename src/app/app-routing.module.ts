import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { EdashboardComponent } from './components/employee/edashboard/edashboard.component';
import { EleaveListComponent } from './components/employee/eleave-list/eleave-list.component';
import { EleaveComponent } from './components/employee/eleave/eleave.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EprofileComponent } from './components/employee/eprofile/eprofile.component';
import { EticketListComponent } from './components/employee/eticket-list/eticket-list.component';
import { EticketComponent } from './components/employee/eticket/eticket.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MaccessComponent } from './components/manager/maccess/maccess.component';
import { ManagerComponent } from './components/manager/manager.component';
import { MdashboardComponent } from './components/manager/mdashboard/mdashboard.component';
import { MleavesComponent } from './components/manager/mleaves/mleaves.component';
import { MlistComponent } from './components/manager/mlist/mlist.component';
import { MprofileComponent } from './components/manager/mprofile/mprofile.component';
import { MticketComponent } from './components/manager/mticket/mticket.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full' },
  {path: 'admin', component: AdminDashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'sign-up', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'employee',component: EdashboardComponent, canActivate: [AuthGuardService]
  , children:[
    {path: '', component: EprofileComponent},
    {path: 'ticket', component: EticketComponent},
    {path: 'leave', component: EleaveComponent},
    {path: 'ticket-list', component: EticketListComponent},
    {path: 'leave-list', component: EleaveListComponent},
  ]},
  //{path: 'employee',component: EmployeeComponent, canActivate: [AuthGuardService]},
  //{path:'manager', component: ManagerComponent, canActivate: [AuthGuardService]},
  {path:'manager', component: MdashboardComponent, canActivate: [AuthGuardService],
  children:[
    {path: '', component: MlistComponent},
    {path: 'ticket', component: MticketComponent},
    {path: 'leave', component: MleavesComponent},
    {path: 'access', component: MaccessComponent}

  ]},
  {path:'logout', component: LogoutComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'reset-password/:ota/:email', component: ResetPasswordComponent},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
