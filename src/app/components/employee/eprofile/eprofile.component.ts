import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-eprofile',
  templateUrl: './eprofile.component.html',
  styleUrls: ['./eprofile.component.css']
})
export class EprofileComponent implements OnInit {
  employee: Employee;
  msg: string = '';
  subscription: Subscription[]=[];
  constructor(private userService: UserService,private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('token')).subscribe({
      next: (data)=>{
          this.employee={
            email: data.email,
            name: data.name,
            jobTitle: data.jobTitle,
            imageUrl: data.imageUrl,
            managerName: data.managerName,
            managerEmail: data.managerEmail,
            role: data.role,
            leavesLeft: data.leavesLeft,
            totalLeaves: data.totalLeaves
          };

          if( !(this.employee.role == 'EMPLOYEE') )
                  this.router.navigateByUrl('/login');
      },
      error: (error)=>{
        this.userService.msg$.next(error.error.msg);
        this.router.navigateByUrl("/login");
      }
    });
  }

}
