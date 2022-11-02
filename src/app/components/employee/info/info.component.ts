import { Component, Input, OnInit }
from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input("employee")
  employee: Employee;

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('token');

    this.userService.msg$.next('Logout Successfull!!')
    this.router.navigateByUrl("/login");
  }
}
