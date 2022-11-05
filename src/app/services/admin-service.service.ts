import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin.model';
import { Employee } from '../models/employee.model';
import { Leave } from '../models/leave.model';
import { Manager } from '../models/manager.model';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  public getAllEmployees(token: string): Observable<Employee[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Employee[]>(environment.serverUrl + '/employee/all-admin',{headers: header});

  }
  public getAllManagers(token: string): Observable<Manager[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Manager[]>(environment.serverUrl + '/manager/all',{headers: header});

  }
  public getAllAdmins(token: string): Observable<Admin[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Admin[]>(environment.serverUrl + '/admin/all',{headers: header});

  }

  public getManagersWithoutAccess(token: string): Observable<Manager[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Manager[]>(environment.serverUrl + '/manager/access', {headers: header});
  }

  public getAdminsWithoutAccess(token: string): Observable<Admin[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Admin[]>(environment.serverUrl + '/admin/admin-unenabled', {headers: header});
  }

  public getEmployeesWithoutAccess(token: string): Observable<Employee[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Employee[]>(environment.serverUrl + '/employee/access-all', {headers: header});
  }

  public grantAccess(email: string, accessLevel: string, token: string): Observable<Employee[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.post<Employee[]>(environment.serverUrl + '/admin/grant-access',{email, role: accessLevel}, {headers: header});
  }

  public fetchTickets(token: string) : Observable<Ticket[]>{
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Ticket[]>(environment.serverUrl + '/ticket/all-admin',{headers: header});
  }

  public fetchLeavesPending(token: string) : Observable<Leave[]>{
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Leave[]>(environment.serverUrl +'/leave/all-admin', {headers: header})
  }


}
