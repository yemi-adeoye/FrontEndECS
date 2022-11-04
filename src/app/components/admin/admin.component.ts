import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { Leave } from 'src/app/models/leave.model';
import { Manager } from 'src/app/models/manager.model';
import { UserInfo } from 'src/app/models/user.model';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin: UserInfo;
  employeeNoAccess: Employee[] = [];
  leaves: Leave[] = [];
  employees: Employee[];
  managers: Manager[];
  constructor(private managerService: ManagerService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('token')).subscribe({
      next: (data) => {
        this.admin = data;
      },
      error: (error) => {
        this.userService.msg$.next(error.error.msg);
        this.router.navigateByUrl('/login');
      }
    }
    );
  }

  /* Call API and grant access */
  grantAccess(email: string) {
    this.managerService.grantAccess(email, localStorage.getItem('token'))
      .subscribe({
        next: (data) => {
          this.employeeNoAccess = this.employeeNoAccess.filter(e => e.email !== email);
        }
      });
  }

}
