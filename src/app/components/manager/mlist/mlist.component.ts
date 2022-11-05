import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Employee } from 'src/app/models/employee.model';
import { Manager } from 'src/app/models/manager.model';
import { UserInfo } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from '../../admin/admin-service';

@Component({
  selector: 'app-mlist',
  templateUrl: './mlist.component.html',
  styleUrls: ['./mlist.component.css']
})
export class MlistComponent implements OnInit {

  employees: Employee[];
  managers: Manager[];
  admins: Admin[]
  user: UserInfo;

  constructor(private managerService: ManagerService,
    private userService: UserService,
    private adminService: AdminServiceService,
    private router: Router) { }

  setRole = (userInfo) => {
    this.user = userInfo;
  }

  ngOnInit(): void {
    const token: string = localStorage.getItem('token');

    // determine user role. If admin, get all employees and managers, else get empl
    // by manager
    this.userService.getUser(token).subscribe({
      next: (data) => {
        this.user = data;

        if (this.user.role == "MANAGER") {
          this.managerService.getAllEmployees(token)

            .subscribe({
              next: (data) => { this.employees = data }
            });
        }

        if (this.user.role == "ADMIN") {
          this.adminService.getAllEmployees(localStorage.getItem('token'))

            .subscribe({
              next: (data) => { this.employees = data }
            });

            // get all managers too
          this.adminService.getAllManagers(localStorage.getItem('token'))

          .subscribe({
            next: (data) => { console.log(data)
              this.managers = data },
            error: () => {}
          });

          // and all admins
          this.adminService.getAllAdmins(localStorage.getItem('token'))

          .subscribe({
            next: (data) => {
              console.log(data)
              this.admins = data },
            error: () => {}
          });
        }
      },
      error: (error) => {

      }

    })

  }
}
