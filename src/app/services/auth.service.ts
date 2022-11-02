import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  status$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService, private router: Router) { }

  isloggedIn(): boolean {
    /* 1. Is the token available in local storage */
    let token = localStorage.getItem('token');
    let status = false;

    if(token){
      /* 2. Is the token valid at this instance? */
      this.status$.subscribe({
        next: (data)=>{
            status = data;
            return status;
        }
      });
    }

    return status;
  }


}
