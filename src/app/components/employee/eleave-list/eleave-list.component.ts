import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leave } from 'src/app/models/leave.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-eleave-list',
  templateUrl: './eleave-list.component.html',
  styleUrls: ['./eleave-list.component.css']
})
export class EleaveListComponent implements OnInit {

  leaves: Leave[]=[];

  constructor(private userService: UserService,private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllLeaves('PENDING').subscribe({
      next: (data)=>{
        this.leaves = data;
      },
      error: (err)=>{

      }
    })
  }

}
