import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
     { path: '/employee', title: 'User Dashboard',  icon:'person', class: '' },
    { path: '/employee/ticket', title: 'Generate Ticket',  icon:'content_paste', class: '' },
    { path: '/employee/leave', title: 'Apply Leave',  icon:'library_books', class: '' },
    { path: '/employee/leave-list', title: 'Leave Records',  icon:'bubble_chart', class: '' },
    { path: '/employee/ticket-list', title: 'Ticket Records',  icon:'content_paste', class: '' },
     { path: '/logout', title: 'Logout',  icon:'unarchive', class: 'active-pro' },
];

export const ROUTES1: RouteInfo[] = [
  { path: '/manager', title: 'Manager Dashboard',  icon:'person', class: '' },
  { path: '/manager/access', title: 'Access Grants',  icon:'bubble_chart', class: '' },
  { path: '/manager/ticket', title: 'All Tickets',  icon:'content_paste', class: '' },
 { path: '/manager/leave', title: 'All Pending Leaves',  icon:'library_books', class: '' },
   { path: '/logout', title: 'Logout',  icon:'unarchive', class: 'active-pro' },
];

export const ROUTES_ADMIN: RouteInfo[] = [
  { path: '/admin', title: 'Admin Dashboard',  icon:'person', class: '' },
  { path: '/admin/access', title: 'Access Grants',  icon:'bubble_chart', class: '' },
  { path: '/admin/ticket', title: 'All Tickets',  icon:'content_paste', class: '' },
 { path: '/admin/leave', title: 'All Pending Leaves',  icon:'library_books', class: '' },
 { path: '/admin/load-file', title: 'Load File',  icon:'create_new_folder', class: '' },
   { path: '/logout', title: 'Logout',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: UserInfo;
  menuItems: any[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('token')).subscribe({
      next: (data)=>{
        this.user = data;
        if(this.user.role === 'EMPLOYEE'){
          this.menuItems = ROUTES.filter(menuItem => menuItem);
        }
         else if (this.user.role === 'MANAGER'){
          this.menuItems = ROUTES1.filter(menuItem => menuItem);
         }
         else if (this.user.role === 'ADMIN'){
          this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
         }else{
          // dev-info
          console.log("no valid route: something is wrong")
         }

      },
      error: (error)=>{
          this.userService.msg$.next(error.error.msg);
          this.router.navigateByUrl('/login');
      }
    });


  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
