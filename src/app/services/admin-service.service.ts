import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Manager } from '../models/manager.model';

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
}
