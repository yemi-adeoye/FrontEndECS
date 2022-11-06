import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.model';
import { UserInfo } from '../models/user.model';
import {environment} from '../../environments/environment';
import { Manager } from '../models/manager.model';
import { Admin } from '../models/admin.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  msg$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  public login(login: Login):Observable<string>{
    const token = window.btoa(login.email + ':'+ login.password);
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<string>(environment.serverUrl + '/auth/login',{headers: header} );
  }

  public getUser(token: string) : Observable<UserInfo>{
    const header = {'Authorization': 'Basic ' + token}
      return this.http.get<UserInfo>(environment.serverUrl + '/auth/user',{headers: header});
  }

  public signUp(employee: Employee) :Observable<any>{
    return this.http.post<any>(environment.serverUrl + '/user/signup', employee);
  }

  public getAllManagers():Observable<Manager[]> {
    return this.http.get<Manager[]>(environment.serverUrl +'/manager/all');
  }

  public getAllAdmins():Observable<any> {
    return this.http.get<any>(environment.serverUrl +'/admin/all');
  }



  public sendVerificationLink(email: string): Observable<any> {
    return this.http.post(environment.serverUrl + '/auth/forgot-password', {'email': email});
  }

  public confirmOta(ota: string, email: string) : Observable<any>{
    return this.http.get(environment.serverUrl + '/auth/confirm-ota/' +ota + '/' + email);
  }

  resetPassword(password: string, email: string): Observable<any> {
    let user={
      username: email,
      password: password
    };
     return this.http.post(environment.serverUrl + '/auth/reset-pass', user);
  }

  revokeAccess(email: string, revokeAccessMessage: string): Observable<any> {
      return this.http.put(environment.serverUrl + `/user/revoke-access/${email}`, {accessMessage: revokeAccessMessage});
  }

}
