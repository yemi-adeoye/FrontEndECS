import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Employee } from 'src/app/models/employee.model';
import { Manager } from 'src/app/models/manager.model';
import { UserService } from 'src/app/services/user.service';
import { managers } from '../../data/data';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  jobTitles: string[] = ['Developer', 'Product Owner', 'Scrum Master', 'DevOps Engineer', 'Tester'];
  role: string[] = ['Employee', 'Manager', 'Admin'];
  managers: Manager[];
  admins: Admin[];
  employee: Employee;
  msg: string = '';
  subscription: Subscription;
  showManagers: boolean = false;
  showAdmins: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.showManagers = false;

    this.userService.getAllManagers().subscribe({
      next: (data) => { this.managers = data; },
      error: (error) => { this.msg = error.error.msg; }
    });

    this.userService.getAllAdmins().subscribe({

      next: (data) => { console.log(data); this.admins = data.data },
      error: (error) => { this.msg = error.error.msg; },
    })

    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      jobTitle: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      managerEmail: new FormControl(''),
      adminName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern(/([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@(?:gmail|incedo|GMAIL|INCEDO)([\.])(?:com|COM)/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9 @_#]+$/)]),
      repassword: new FormControl('', Validators.required)
    });
    console.log(this.signUpForm)
  }

  handleManagerAdminView = ($event) => {

    const role: string = $event.target.value;



    if (role === "EMPLOYEE") {
      this.showManagers = true;
      this.showAdmins = false;
      // admin is not required set validators on admin to null

    } else if (role === "MANAGER") {
      this.showAdmins = true;
      this.showManagers = false;

    } else if (role === "ADMIN") {
      this.showManagers = false;
      this.showAdmins = false;

    }

    console.log(this.signUpForm)
    // update form valid status

  }
  onAdminChange = () => {
    console.log(this.signUpForm);
  }
  onFormSubmit() {
    /* 1. Check if Password Match */
    if (!(this.signUpForm.value.password === this.signUpForm.value.repassword)) {
      this.msg = 'Passwords do not Match';
      return;
    }

    // ensure an admin or a manager is selectd
    if ((this.signUpForm.value.managerEmail === '' &&
    this.signUpForm.value.adminName === '' && this.signUpForm.value.role !== "ADMIN")) {
            if (this.signUpForm.value.role === 'MANAGER'){
              this.msg = 'Admin is required';
            }else{
              this.msg = 'Manager is required';
            }

      return;
    }
    /* 2. call API and post this data */
    this.employee = {
      name: this.signUpForm.value.name,
      jobTitle: this.signUpForm.value.jobTitle,
      email: this.signUpForm.value.email,
      role: this.signUpForm.value.role,
      password: this.signUpForm.value.password,
      managerEmail: this.signUpForm.value.managerEmail,
      adminName: this.signUpForm.value.adminName,
      // add a role here
    };

    this.subscription = this.userService.signUp(this.employee).subscribe({
      next: (data) => {
        this.userService.msg$.next('SignUp Success');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.msg = error.error.msg;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
