import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  status: false;
  status$ = new BehaviorSubject<boolean>(false);


  constructor(private userService: UserService, private router: Router) {

  }

  setStatus(status){
    this.status = status;
    return this.status;
    console.log("logging from callback" + this.status)

  }

  /**
   * check if token exists in local storage. if not return false
   * if it does get user from backend
   * if not valid user return false
   * return true
   * @returns check
   */
   isloggedIn(): boolean {
    /*// 1. Is the token available in local storage
    let token = localStorage.getItem('token');

    if(token){
      // 2. Is the token valid at this instance?
      this.status$.subscribe({
        next: (data)=>{
            this.setStatus(data)

        }
      });
    }*/

    let status : boolean = false;

    const token = localStorage.getItem('token');

    if (token){
      // verify user is valid
      console.log("calling auth service")
      const response =  this.userService.getUser(token).subscribe({
        next: (data) => console.log(data)
      })
      console.log(response);

    }

    console.log("loggin from close to return value" + this.status)
    return true;
  }


}
