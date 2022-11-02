import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-manager-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class ManagerTicketComponent implements OnInit {

  tickets: Ticket[]=[];
  msg: string;
  response: string;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.fetchTickets(localStorage.getItem('token'))
    .subscribe({
      next: (data)=>{
          this.tickets = data;
      },
      error: (error)=>{
        this.msg = error.error.msg;
      }
    });
  }

  onSubmitResponse(id:string){
      this.managerService.updateResponse(
        localStorage.getItem('token'),
        id,this.response ).subscribe({
          next: (data)=>{
            this.msg="Response Posted!!!";
          },
          error: (error)=>{
            this.msg = error.error.msg;
          }
        })
  }
}
