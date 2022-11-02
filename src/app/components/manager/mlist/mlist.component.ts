import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mlist',
  templateUrl: './mlist.component.html',
  styleUrls: ['./mlist.component.css']
})
export class MlistComponent implements OnInit {

  employees: Employee[];
  constructor(private managerService: ManagerService, private userService: UserService,
    private router:Router) { }

  ngOnInit(): void {

    this.managerService.getAllEmployees(localStorage.getItem('token'))
      .subscribe({
        next: (data)=>{this.employees = data}
      });
  }

}
