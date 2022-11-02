import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loginForm: FormGroup;
  ota: string;
  msg: string;
  email: string;

  constructor(private userService: UserService, private router:Router,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ota = this.actRoute.snapshot.params['ota'];
    this.email = this.actRoute.snapshot.params['email'];

    this.loginForm=new FormGroup({
      password: new FormControl('', [Validators.required ]),
      repassword: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9 @_#]+$/) ]),
    });

    this.userService.confirmOta(this.ota,this.email).subscribe({
      next: (data)=>{
        this.msg='Verification Success, Set new password';
      },
      error: (error)=>{
        this.msg='Verification Failed';
      }
    });

  }

  onFormSubmit(){
      if(this.loginForm.value.password !== this.loginForm.value.repassword){
        this.msg='Passwords must match';
      }
      else
      this.userService.resetPassword(this.loginForm.value.password, this.email)
      .subscribe({
        next: (data)=>{
          this.msg='Password Reset Successful, Login with new password'
        },
        error: (error)=>{
          this.msg='Password reset failed.'
        }
      });
   }
}
