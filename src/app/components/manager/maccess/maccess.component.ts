import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maccess',
  templateUrl: './maccess.component.html',
  styleUrls: ['./maccess.component.css']
})
export class MaccessComponent implements OnInit {

  employees: Employee[];
  employeeNoAccess: Employee[]=[];
  msg: string;

  constructor(private managerService: ManagerService, private userService: UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.managerService.getEmployeeWithoutAccess(localStorage.getItem('token'))
      .subscribe({
        next: (data)=> {
          this.employeeNoAccess = data;
          this.employees = data;

        },
        error: ()=>{

        }
      });
  }

  grantAccess(email: string){
    this.managerService.grantAccess(email, localStorage.getItem('token'))
    .subscribe({
      next: (data)=>{
          this.employees = this.employees.filter(e=>e.email !== email);
          this.msg="Access Granted to: " + email;
        }
    });
}

}
