import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Employee } from 'src/app/models/employee.model';
import { Manager } from 'src/app/models/manager.model';
import { UserInfo } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maccess',
  templateUrl: './maccess.component.html',
  styleUrls: ['./maccess.component.css']
})
export class MaccessComponent implements OnInit {

  employees: Employee[];
  employeeNoAccess: Employee[] = [];
  managers: Manager[];
  admins: Admin[];
  msg: string;
  user: UserInfo;
  role: string;
  levels: string[] = ['Employee', 'Manager', 'Admin']
  userAccessMap: object = {};

  constructor(private managerService: ManagerService,
    private userService: UserService,
    private adminService: AdminServiceService,
    private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.userService.getUser(token).subscribe({
      next: (userInfo) => {
        this.user = userInfo;
        this.role = userInfo.role;

        if (this.user.role == 'MANAGER') {
          // gets employee without access for the specific manager
          this.managerService.getEmployeeWithoutAccess(localStorage.getItem('token'))
            .subscribe({
              next: (data) => {
                this.employeeNoAccess = data;
                this.employees = data;

              },
              error: () => {

              }
            });
        }

        if (this.user.role == 'ADMIN') {
          // gets all employes without access
          this.adminService.getEmployeesWithoutAccess(token).subscribe({
            next: (employees) => {

              this.employees = employees;
              // update access map
              for (const employee of employees) {
                this.userAccessMap[employee.email] = employee.role;
              }
            },
            error: (error) => {

            }
          })

          // gets all managers without access
          this.adminService.getManagersWithoutAccess(token).subscribe({
            next: (managers) => {

              this.managers = managers;
              // update access map
              for (const manager of managers) {
                this.userAccessMap[manager.email] = manager.role;
              }
            },
            error: (error) => {

            }
          })

          // gets all admins without access
          this.adminService.getAdminsWithoutAccess(token).subscribe({
            next: (admins) => {

              this.admins = admins;
              // update access map
              for (const admin of admins) {
                this.userAccessMap[admin.email] = admin.role;
              }
            },
            error: (error) => {

            }
          })

        }

      },
      error: () => {

      }
    })

  }

  grantAccess(email: string) {
    // a manager can only grant employee access
    console.log(this.user.role)
    if (this.user.role == 'MANAGER') {
      this.managerService.grantAccess(email, localStorage.getItem('token'))
        .subscribe({
          next: (data) => {
            this.employees = this.employees.filter(e => e.email !== email);
            this.msg = "Access Granted to: " + email;
          }
        });
    }

    // an admin can grant employee, manager, admin access
    if (this.user.role == 'ADMIN') {
      console.log(this.userAccessMap[email])
      const accessLevel = this.userAccessMap[email];
      this.adminService.grantAccess(email, accessLevel, localStorage.getItem('token'))

        .subscribe({
          next: (data) => {
            console.log(data)
            /*this.employees = this.employees.filter(e => e.email !== email);
            this.msg = "Access Granted to: " + email;*/
          }
        });
    }

  }


  updateUserAccessMap = ($event) => {
    const managerEmail = $event.target.id;
    const accessLevel = $event.target.value;
    this.userAccessMap = { ...this.userAccessMap, [managerEmail]: accessLevel }
  }



}
