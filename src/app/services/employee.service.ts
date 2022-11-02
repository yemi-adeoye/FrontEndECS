import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Leave } from '../models/leave.model';
import { Ticket } from '../models/ticket.model';
import {leaves} from '../data/data'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  leaveApplied$ = new BehaviorSubject<Leave>({});
  ticketCreated$ = new BehaviorSubject<Ticket>({});

  constructor(private http: HttpClient) { }

  public postTicket(ticket: Ticket) : Observable<Ticket>{
    const header = {'Authorization': 'Basic ' +  localStorage.getItem('token')}
      return this.http.post<Ticket>(environment.serverUrl + '/ticket/add' , ticket, {headers: header});
  }

  public applyLeave(leave: Leave) : Observable<Leave> {
    const header = {'Authorization': 'Basic ' +  localStorage.getItem('token')}
     return this.http.post<Leave>(environment.serverUrl + '/leave/add', leave, {headers: header});
  }

  public getAllLeaves(status): Observable<Leave[]> {
    const header = {'Authorization': 'Basic ' +  localStorage.getItem('token')}
      return this.http.get<Leave[]>(environment.serverUrl + '/leave/employee/all/' + status, {headers: header});
  }

  public fetchTickets(status:string): Observable<Ticket[]> {
    const header = {'Authorization': 'Basic ' +  localStorage.getItem('token')}
    return this.http.get<Ticket[]>(environment.serverUrl + '/ticket/status/' + status, {headers: header});
  }

  public updateTicketStatus(id: string, status: string): Observable<any> {
     let obj = {
      'ticketId': id,
      'status':status
     };
     const header = {'Authorization': 'Basic ' +  localStorage.getItem('token')}

     return this.http.put<any>(environment.serverUrl + '/ticket/status/update', obj, {headers: header});
  }

  public fetchAllPriorities(): Observable<string[]> {
     return this.http.get<string[]>(environment.serverUrl + '/ticket/priority/all');
  }

  public deleteLeave(id: number) : Observable<any>{
     return this.http.delete<any>(environment.serverUrl + '/leave/delete/' + id);
  }

}
