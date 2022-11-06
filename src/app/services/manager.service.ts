import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Leave } from '../models/leave.model';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http: HttpClient) { }

  public getEmployeeWithoutAccess(token: string): Observable<Employee[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Employee[]>(environment.serverUrl + '/employee/access', {headers: header});
  }

  public grantAccess(email: string, accessGrantMsg: string, token: string) : Observable<any>{
   const header = {'Authorization': 'Basic ' + token}
   return this.http.get<any>(environment.serverUrl +'/user/grant-access/'+ email + '/' + accessGrantMsg, {headers: header});
  }

  public fetchLeavesPending(token: string) : Observable<Leave[]>{
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Leave[]>(environment.serverUrl +'/leave/all', {headers: header})
  }

  public updateLeaveStatus(token: string, leaveStatus: string, leaveID: number, eemail: String)
    : Observable<any>{
      const header = {'Authorization': 'Basic ' + token}
      return this.http.get(environment.serverUrl + '/leave/update-status/' +leaveID + '/'+leaveStatus, {headers: header});
  }

  public fetchTickets(token: string) : Observable<Ticket[]>{
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Ticket[]>(environment.serverUrl + '/ticket/all',{headers: header});
  }

  updateResponse(token: string, id: string, response: string) : Observable<any>{
    const header = {'Authorization': 'Basic ' + token}
    let tbody={
      ticketId: id,
      response: response
  }
    return this.http.put(environment.serverUrl + '/ticket/response',
    tbody, {headers: header} );
  }

  public getAllEmployees(token: string): Observable<Employee[]> {
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<Employee[]>(environment.serverUrl + '/employee/all',{headers: header});

  }

  public updateLeaveResponse(token: string, leaveId: number, response: string) : Observable<any>{
    const header = {'Authorization': 'Basic ' + token}
    let obj={
      id: leaveId,
      response:response
    }
    return this.http.put(environment.serverUrl + '/leave/update', obj,{headers: header} )
  }

  public sendEmployeeBatch(token: string, employees:Employee[]) :Observable<any>{
    const header = {'Authorization': 'Basic ' + token}
    return this.http.post(environment.serverUrl + '/admin/employee/post', employees, {headers: header})
  }
}
