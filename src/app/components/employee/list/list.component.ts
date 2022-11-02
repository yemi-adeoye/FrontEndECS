import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Leave } from 'src/app/models/leave.model';
import { Ticket } from 'src/app/models/ticket.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,OnDestroy {

  @Input("leaves")
  leaves: Leave[]=[];

  @Input("tickets")
  tickets: Ticket[]=[];

  @Output('status')
  updateStatus = new EventEmitter();

  subscription: Subscription[]=[];

  msg: string ='';
  constructor(private employeeService: EmployeeService) { }


  ngOnInit(): void {
      this.subscription.push(
      this.employeeService.leaveApplied$.subscribe(data=>{
            if(this.leaves)
                  this.leaves.push(data);
      }));
      this.subscription.push(
      this.employeeService.ticketCreated$.subscribe(data=>{
          if(this.tickets)
              this.tickets.push(data);
      }));
  }

  onCloseTicket(id: string){
      this.updateStatus.emit(id);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s=> s.unsubscribe());
  }

  onLeaveDelete(id: number){
      this.employeeService.deleteLeave(id).subscribe({
        next: (data) =>{
          this.leaves = this.leaves.filter(l=>l.id !== id);
          this.msg="Record Archived";
        }
      });
  }
}
