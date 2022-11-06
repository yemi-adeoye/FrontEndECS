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
  msg: string;

  constructor(private managerService: ManagerService,
    private userService: UserService,
    private adminService: AdminServiceService,
    private router: Router) { }

  setRole = (userInfo) => {
    this.user = userInfo;
  }

  resetMsg(){
    this.msg = "";
  }

  ngOnInit(): void {

    const alertContainer: any = document.getElementById('alert-container');

    // checking to see when the alert is added to the container
    const watchOutFor: any = { childList: true };

    const observerCallback = (mutationList, observer) => {
      const alert = document.getElementById('alert');

      if (alert) {
        alert.style.position = 'absolute';
        alert.style.width = '94%';
        alert.style.top = (window.scrollY - alert.clientHeight - 80) + 'px';
        alert.style.zIndex = '100';
      }



    }
    const observer = new MutationObserver(observerCallback);

    observer.observe(alertContainer, watchOutFor);

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
              next: (data) => {
                this.employees = data }
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

  revokeAccess = (email : string) => {
    const revokeAccessMessage: string = prompt("Please enter reason for revoking access");
    this.userService.revokeAccess(email, revokeAccessMessage).subscribe({
      next: (response) => {

        this.msg = response.msg;
        switch(response.data.role){
          case 'EMPLOYEE':
            this.employees.forEach(e => e.email == email ? e.enabled = false : e.enabled = e.enabled);

            break;
          case 'MANAGER':
            this.managers.forEach(e => e.email == email ? e.enabled = false : e.enabled = e.enabled);
            break;
          case 'ADMIN':
            this.admins.forEach(e => e.email == email ? e.enabled = false : e.enabled = e.enabled);
            break;
        }


      },
      error: (error) => {

      }
    })
  }
}
