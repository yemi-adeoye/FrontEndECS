import { Component, Input, OnInit } from '@angular/core';
import { Leave } from 'src/app/models/leave.model';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-manager-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class ManagerLeavesComponent implements OnInit {

  @Input("leaves")
  leaves: Leave[]=[];
  showCommentBox:boolean=false;
  tempLeaves: Leave[]=[];
  leaveId: number;
  response: string;
  msg: string;
  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
  }

  onLeaveClick(leaveStatus:string, leaveID:number, eemail:String){
      this.managerService.updateLeaveStatus(localStorage.getItem('token'), leaveStatus, leaveID, eemail)
      .subscribe({
        next: (data)=>{
              if(leaveStatus === 'APPROVED'){
                  let days  =  this.leaves.filter(l=>l.id === leaveID)[0].days;
                  this.leaves = this.leaves.filter(l=>l.id !== leaveID);
                  this.leaves.forEach(l=>{
                      l.leavesLeft = l.leavesLeft - days;
                      this.tempLeaves.push(l);
                  });
                  this.leaves = this.tempLeaves;
              }
              else
              if(leaveStatus === 'DENIED'){
                  this.leaveId = leaveID;
                  this.showCommentBox = true;
              }
        },
        error: ()=>{}
      })
  }

  onLeaveDeny(){

    /* Call the api to update the response given for this leaveId */
    this.managerService
    .updateLeaveResponse(localStorage.getItem('token'),this.leaveId, this.response)
    .subscribe({
      next: (data)=>{
        this.showCommentBox = false;
        this.leaves = this.leaves.filter(l=>l.id !== this.leaveId);
        this.msg="Response Noted.";
      },
      error: (error)=> {
        this.msg='Could not complete the operation, try later';
      }
    })
  }

}
