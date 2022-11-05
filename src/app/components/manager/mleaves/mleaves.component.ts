import { Component, OnInit } from '@angular/core';
import { Leave } from 'src/app/models/leave.model';
import { UserInfo } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from '../../admin/admin-service';

@Component({
  selector: 'app-mleaves',
  templateUrl: './mleaves.component.html',
  styleUrls: ['./mleaves.component.css']
})
export class MleavesComponent implements OnInit {

  leaves: Leave[] = [];
  showCommentBox: boolean = false;
  tempLeaves: Leave[] = [];
  leaveId: number;
  response: string;
  msg: string;
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
          // FETCH TICKETS FOR SUBORDINATES
          this.managerService.fetchLeavesPending(localStorage.getItem('token'))
            .subscribe({
              next: (data) => {
                this.leaves = data;
              },
              error: () => { }
            });
        }

        if (this.user.role == "ADMIN") {
          // FETCH TICKETS FOR SUBORDINATES
          this.adminService.fetchLeavesPending(localStorage.getItem('token'))
            .subscribe({
              next: (data) => {
                this.leaves = data;
              },
              error: () => { }
            });
        }


      },
      error: (error) => {

      }
    });


  }

  onLeaveClick(leaveStatus: string, leaveID: number, eemail: String) {
    this.managerService.updateLeaveStatus(localStorage.getItem('token'), leaveStatus, leaveID, eemail)
      .subscribe({
        next: (data) => {
          if (leaveStatus === 'APPROVED') {
            let days = this.leaves.filter(l => l.id === leaveID)[0].days;
            this.leaves = this.leaves.filter(l => l.id !== leaveID);
            this.leaves.forEach(l => {
              l.leavesLeft = l.leavesLeft - days;
              this.tempLeaves.push(l);
            });
            this.leaves = this.tempLeaves;
          }
          else
            if (leaveStatus === 'DENIED') {
              this.leaveId = leaveID;
              this.leaves = this.leaves.filter(l => l.id !== this.leaveId);
              this.msg = "Response Noted.";
            }
        },
        error: () => { }
      })
  }

  onLeaveDeny() {

    /* Call the api to update the response given for this leaveId */
    this.managerService
      .updateLeaveResponse(localStorage.getItem('token'), this.leaveId, this.response)
      .subscribe({
        next: (data) => {
          this.showCommentBox = false;
          this.leaves = this.leaves.filter(l => l.id !== this.leaveId);
          this.msg = "Response Noted.";
        },
        error: (error) => {
          this.msg = 'Could not complete the operation, try later';
        }
      })
  }
}
