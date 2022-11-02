import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Employee } from '../../../models/employee.model'
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/manager.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  userForm: FormGroup;

  downloadReady: boolean = false;
  href: string = ''

  employees: Employee[] = [];

  csvContentHead = []; // to hold the content head of the csv file
  csvContentBody = []; // to hold the content body of the csv file

  constructor(private http: HttpClient, private fb: FormBuilder, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userFormRows: this.fb.array([])
    })
    this.addUser();
  }

  // getter for userFormRows
  get userFormRows(): FormArray {
    return this.userForm.get("userFormRows") as FormArray;
  }

  // reads content of csv file
  readFile(e: any) {
    // create a new FileReader
    const myFileReader: FileReader = new FileReader();

    // read the contents of the file loaded via input html tag
    myFileReader.readAsText(e.target.files[0]);

    // this is called when file is done loading
    myFileReader.onload = (e) => {
      // get the file contents
      const fileContents: any = e.target.result;

      // split file by line breakers to get an array of lines
      const linesOfFileContent = fileContents.split("\n");

      this.csvContentHead = linesOfFileContent[0].split(',');

      const csvRemainder = linesOfFileContent.slice(1, linesOfFileContent.length)

      // split each line by delimiter: comma
      for (const line of csvRemainder) {

        const csvLineValsArr = line.split(",");

        const lineArray = [];

        for (const value of csvLineValsArr) {
          lineArray.push(value.trimEnd());
        }

        this.csvContentBody.push(lineArray);
      }

      // add content to form
      this.buildForm(this.csvContentBody)

    }

    myFileReader.onerror = (e) => {
      console.log(e.target.error);
    }

  }

  // creates a blank user row
  addUser(): void{
    const blankUser: string[] = Array(7).fill(null);
    const userFormGroup: FormGroup = this.createUserFormRow(blankUser);
    this.userFormRows.push(userFormGroup);
  }

  deleteUser(event): void {
    const id: number = Number(event.target.id);
    this.userFormRows.removeAt(id);
  }

  // creates a form group that represents a user
  createUserFormRow(values): FormGroup {
    console.log(values[6]);
    const usersFormRow = this.fb.group({
      "name": [values[0], Validators.required],
      "email": [values[1], Validators.required],
      "password": [values[2], Validators.required],
      "jobTitle": [values[3], Validators.required],
      "totalLeaves": [values[4], Validators.required],
      "leavesLeft": [values[5], Validators.required],
      "managerName": [values[6], Validators.required],
    })

    return usersFormRow;
  }

  // builds n rows of users based on fieldsArray provided as parameter
  buildForm(fieldsArray): void {

    fieldsArray.forEach((userRow, index) => {
      this.userFormRows.push(this.createUserFormRow(userRow));
    })

  }


  // handles form submission
  submit(): void {

    const employees: Employee[] =[];

    for (const e of this.userFormRows.value){
      let employee:Employee;
      employee = {...e};
      employees.push(employee);
    }
    console.log(employees);
    const token = localStorage.getItem('token');
    this.managerService.sendEmployeeBatch(token, employees).subscribe((res)=>{
      console.log(res);
    })

    alert("CSV File loaded successfully")
    this.ngOnInit();
  }

  downloadCsv(): void{
    const users = this.userForm.value;
    let content: string = this.csvContentHead.join(',').trimEnd(); // holds all the csv text content
    console.log(users);
    users.userFormRows.map((user) => {
      let contentRow: string = Object.values(user).join(',');
      contentRow.trimEnd()
      content += contentRow + "\n";
    })

    // send to server to save then send download link back

    /*// create blob
    const textAsBlob = new Blob([content], {type: 'text/plain'});

    this.href = window.location.protocol + "//" + window.location.host + window.URL.createObjectURL(textAsBlob);

    console.log(window.URL.createObjectURL(textAsBlob))
    this.downloadReady = true;*/


    //console.log(content)
  }
}
