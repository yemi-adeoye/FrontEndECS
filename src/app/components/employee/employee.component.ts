import { Component, OnDestroy, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { Leave } from 'src/app/models/leave.model';
import { Ticket } from 'src/app/models/ticket.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { priority } from '../../data/data'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,OnDestroy {

  employee: Employee;

  priority: string[]= priority;
  msg: string = '';
  ticket: Ticket;
  tickets: Ticket[]=[];
  leave: Leave;
  leaveMsg: string='';
  leaveArry: Leave[];
  leaveErrorMsg:string='';
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
    this.subscription.push(
    this.employeeService.getAllLeaves('PENDING').subscribe({
      next: (data)=>{
        this.leaveArry = data;
      },
      error: (err)=>{

      }
    }));
    this.subscription.push(
    this.employeeService.fetchTickets('OPEN').subscribe({
      next: (data)=>{
          this.tickets = data;
      },
      error: (error)=>{}
    }));
  }

  onStatusUpdate($event: any){
      let id = $event;
      this.subscription.push(
      this.employeeService.updateTicketStatus(id,'CLOSED').subscribe({
        next: (data)=>{
            this.tickets = this.tickets.filter(t=> t.id !== id);
        },
        error: (error)=>{}
      }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s=> s.unsubscribe());
 }

}
