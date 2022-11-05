import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { UserInfo } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mticket',
  templateUrl: './mticket.component.html',
  styleUrls: ['./mticket.component.css']
})
export class MticketComponent implements OnInit {

  tickets: Ticket[] = [];
  msg: string;
  response: string;
  user: UserInfo;

  constructor(private managerService: ManagerService,
    private userService: UserService,
    private adminService: AdminServiceService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.userService.getUser(token).subscribe({
      next: (data) => {
        this.user = data;

        if (this.user.role == "MANAGER") {
          // FETCH LEAVES FOR SUBORDINATES OF GIVEN MANAGER
          this.managerService.fetchTickets(token)
            .subscribe({
              next: (data) => {
                this.tickets = data;
              },
              error: (error) => {
                this.msg = error.error.msg;
              }
            });
        }

        if (this.user.role == "ADMIN") {
          // FETCH ALL PENDING LEAVES
          this.adminService.fetchTickets(token)
            .subscribe({
              next: (data) => {
                this.tickets = data;
              },
              error: (error) => {
                this.msg = error.error.msg;
              }
            });
        }
      },
      error: (error) => {

      }
    });


  }

  onSubmitResponse(id: string) {
    this.managerService.updateResponse(
      localStorage.getItem('token'),
      id, this.response).subscribe({
        next: (data) => {
          this.msg = "Response Posted!!!";
        },
        error: (error) => {
          this.msg = error.error.msg;
        }
      })
  }
}
