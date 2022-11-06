import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { Leave } from 'src/app/models/leave.model';
import { UserInfo } from 'src/app/models/user.model';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  manager: UserInfo;
  employeeNoAccess: Employee[]=[];
  leaves: Leave[]=[];
  employees: Employee[];
  constructor(private managerService: ManagerService, private userService: UserService,
    private router:Router) { }

  ngOnInit(): void {
      this.userService.getUser(localStorage.getItem('token')).subscribe({
        next: (data)=>{
          this.manager = data;
        },
        error: (error)=>{
            this.userService.msg$.next(error.error.msg);
            this.router.navigateByUrl('/login');
        }
      }
      );

      /* Get all employees not having access */
      this.managerService.getEmployeeWithoutAccess(localStorage.getItem('token'))
      .subscribe({
        next: (data)=> {
          this.employeeNoAccess = data;
        },
        error: ()=>{

        }
      });

      this.managerService.fetchLeavesPending(localStorage.getItem('token'))
      .subscribe({
        next: (data)=>{
            this.leaves = data;
        },
        error: ()=>{}
      });

      this.managerService.getAllEmployees(localStorage.getItem('token'))
      .subscribe({
        next: (data)=>{this.employees = data}
      });
  }

  /* Call API and grant access */
  grantAccess(email: string){
    const accessGrantMsg = window.prompt("Enter aditional access grant message.");

      this.managerService.grantAccess(email, accessGrantMsg, localStorage.getItem('token'))
      .subscribe({
        next: (data)=>{
            this.employeeNoAccess = this.employeeNoAccess.filter(e=>e.email !== email);
         }
      });
  }


}
