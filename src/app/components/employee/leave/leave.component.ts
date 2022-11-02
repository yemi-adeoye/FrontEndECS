import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Leave } from 'src/app/models/leave.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit,OnDestroy {

  leaveForm: FormGroup;
  leaveMsg: string='';
  leave: Leave;
  subscription: Subscription;

  constructor(private employeeService: EmployeeService) { }


  ngOnInit(): void {
    this.leaveForm = new FormGroup({
      from : new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      numDays: new FormControl('', Validators.required)
    });
  }

  onApplyLeave(){
    this.leave = {
      to: this.leaveForm.value.to,
      from: this.leaveForm.value.from,
      days: this.leaveForm.value.numDays
    };

    this.subscription = this.employeeService.applyLeave(this.leave).subscribe({
      next: (data)=>{
        this.leave = data;
        this.leaveMsg='Leave applied successfully';
        this.employeeService.leaveApplied$.next(this.leave);
      },
      error: (error)=>{
        this.leaveMsg=error.error.msg
      }
    });
  }
ngOnDestroy(): void {
  if(this.subscription)
        this.subscription.unsubscribe();
}
}
