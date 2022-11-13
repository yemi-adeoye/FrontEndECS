import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models/ticket.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-eticket',
  templateUrl: './eticket.component.html',
  styleUrls: ['./eticket.component.css']
})
export class EticketComponent implements OnInit {

  ticketForm: FormGroup;
  msg: string = '';
  ticket: Ticket;
  priority: string[];
  priorityHtml = {}
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
          for (let item of this.priority){
            switch(item.toUpperCase()){
              case "RED":
                this.priorityHtml[item] = "High";
                break;
              case "BLUE":
                this.priorityHtml[item] = "Medium";
                break;
              case "YELLOW":
                this.priorityHtml[item] = "Low";
                break;
            }
          }
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

    this.ngOnInit();
  }

  resetMsg(){
    this.msg = ''
  }

  ngOnDestroy(): void {
    if(this.subscription)
        this.subscription.unsubscribe();
 }

}
