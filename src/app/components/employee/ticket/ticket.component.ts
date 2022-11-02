import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ticket } from 'src/app/models/ticket.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit,OnDestroy {

  ticketForm: FormGroup;
  msg: string = '';
  ticket: Ticket;
  priority: string[];
  subscription: Subscription;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      issue : new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required)
    });

    /* Call the API to fetch all ticket priorities */
    this.employeeService.fetchAllPriorities().subscribe({
      next: (data)=>{
          this.priority = data;
      }
    });
  }

  onIssueSubmit(){
    this.ticket={
      issue: this.ticketForm.value.issue,
      priority:this.ticketForm.value.priority

    };

    this.subscription = this.employeeService.postTicket(this.ticket).subscribe({
      next: (data)=>{
        this.ticket = data;
        this.msg='Ticket successfully posted.';
        this.employeeService.ticketCreated$.next(this.ticket);
      },
      error: (error)=>{
        this.msg=error.error.msg;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription)
        this.subscription.unsubscribe();
 }
}
