import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { UserInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class ManagerInfoComponent implements OnInit {

  @Input("manager")
  manager: UserInfo;

  @Input("employees")
  employees: Employee[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }
  onLogout(){
    localStorage.removeItem('token');
    this.userService.msg$.next('Logout Successfull!!')
    this.router.navigateByUrl("/login");
  }
}
