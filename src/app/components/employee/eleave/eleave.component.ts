import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Leave } from 'src/app/models/leave.model';
import { EmployeeService } from 'src/app/services/employee.service';
import * as moment from 'moment' ;

@Component({
  selector: 'app-eleave',
  templateUrl: './eleave.component.html',
  styleUrls: ['./eleave.component.css']
})
export class EleaveComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  myFilter1 = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  leaveForm: FormGroup;
  leaveMsg: string='';
  leave: Leave;
  subscription: Subscription;

  constructor(private employeeService: EmployeeService) { }

  createLeaveForm = () => {
    this.leaveForm = new FormGroup({
      from : new FormControl(Date.now.toString, [Validators.required, EleaveComponent.cannotBeEarlierThanToday]),
      to: new FormControl('', [Validators.required,]),
      numDays: new FormControl('', Validators.required)
    });
  }

  static cannotBeEarlierThanToday(control: FormControl){
    return new Date(control.value) >= new Date() ? null : {inValidStartDate: true}
  }

  static cannotBeEarlierThanStart = (control: FormControl): ValidatorFn => {
    return (startDate) : ValidationErrors | null => {
      if (new Date(control.value) < new Date(startDate.toString())){
        return {invalidEndDate: true}
      }
      return null;
    }

  }

  onDateChange(){
    console.log("chnged")
    if (this.leaveForm.value.from < this.leaveForm.touched){
      this.leaveForm.controls['to'].setErrors({required: true})
      this.leaveForm.controls['days'].setValue("Start date must be earlier than end date")
    }
    this.leaveForm.controls['days'].setValue("Start date must be earlier than end date")
  }

  ngOnInit(): void {
    console.log(this.calcBusinessDays("2022/12/25", "2022/12/28"))

    this.createLeaveForm();
  }

  resetMsg(){
    this.leaveMsg = ''
  }

  calcBusinessDays(startDate, endDate) {
    const day: any = moment(startDate, "YYYY-MM-DD");
    endDate = moment(endDate, "YYYY-MM-DD")
    let businessDays = 0;

    while (day.isSameOrBefore(endDate,'day')) {
      if (day.day()!=0 && day.day()!=6) businessDays++;
      day.add(1,'d');
    }
    return businessDays;
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

    this.createLeaveForm();


    this.leaveForm.updateValueAndValidity();

  }
ngOnDestroy(): void {
  if(this.subscription)
        this.subscription.unsubscribe();
}

}
