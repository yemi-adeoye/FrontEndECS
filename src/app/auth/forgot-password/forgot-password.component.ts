import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  loginForm: FormGroup;
  login: Login;
  msg: string;
  subscription: Subscription[]=[];

  constructor(private userService: UserService, private router:Router,
    private authService: AuthService) {

     }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email])
    });

  }

  onFormSubmit(){
    this.userService.sendVerificationLink(this.loginForm.value.email)
    .subscribe({
      next: (data)=>{
          this.msg='please click on the link in your email to preceed';
      },
      error:(error)=>{
        this.msg = error.error.msg
      }
    });
   }
}
