import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-manager-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class ManagerAccessComponent implements OnInit {

  @Input("employees")
  employees: Employee[];

  @Output("grant")
  grantAccessEmitter = new  EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  grantAccess(email:string){
    this.grantAccessEmitter.emit(email);
  }
}
