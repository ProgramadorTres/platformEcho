import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'users-navbar',
  imports: [],
  templateUrl: './navbar-users.html',
})
export class NavbarUsers { 
   authService = inject (AuthService);
  
}
