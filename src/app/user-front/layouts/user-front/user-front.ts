import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarUsers } from '../../components/navbar-users/navbar-users';
import { SideMenu } from '../../components/side-menu/side-menu';


@Component({
  selector: 'app-user-front',
  imports: [NavbarUsers],
  templateUrl: './user-front.html',
})
export class UserFront { }
