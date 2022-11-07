import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm: FormGroup;
  login: Login;
  msg: string;
  subscription: Subscription[]=[];

  constructor(private userService: UserService, private router:Router,
    private authService: AuthService) {
     }

  ngOnInit(): void {
    /* read the token from ls
    call the api /user: token */
    this.loginForm=new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.subscription.push(this.userService.msg$.subscribe(val=>{
      this.msg = val;
    }));
  }

  onFormSubmit(){
     this.login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
     };
     //check for admin user/pass, then navigate to admincomponent
     //if (this.login.email == "admin" && this.login.password == "admin@123"){
      //this.router.navigateByUrl('/admin');
      //return
     //}

     /* Call login API */
     this.subscription.push(
     this.userService.login(this.login).subscribe({
      next: (data)=>{
           const token = window.btoa(this.login.email + ':'+ this.login.password);
          localStorage.setItem('token',token);
          /* Update the subject(status$): true  */
          this.authService.status$.next(true);

          this.router.navigateByUrl('/home');
        },
      error: (error)=>{
        if(error.error.msg){
          // error from auth login method
          this.msg = `${error.error.msg}` ;
        }else{
          // error from spring security
          console.log(error)
          this.msg = `${error.error.error}` ;
        }
      }
     }));
  }
  ngOnDestroy(): void {
     this.subscription.forEach(s=>s.unsubscribe());
  }
}

