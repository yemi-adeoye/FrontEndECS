import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserInfo;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('token')).subscribe({
      next: (data)=>{
        console.log(data)
        this.user = data;
        if(this.user.role === 'EMPLOYEE'){
              this.router.navigateByUrl('/employee');
        }
        else if (this.user.role == 'ADMIN'){
            this.router.navigateByUrl('/admin');
        }else if (this.user.role == 'MANAGER'){
            this.router.navigateByUrl('/manager');
        }else{
          // developer message
          console.log("No role found for user");
        }

      },
      error: (error)=>{
          this.userService.msg$.next(error.error.msg);
          this.router.navigateByUrl('/login');
      }
    });

  }

}
