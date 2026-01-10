import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarUsers } from '../../components/navbar-users/navbar-users';

import { CommonModule } from '@angular/common';
import { AuthService } from '@auth/services/auth.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;  // ← Correcto: con 'e' al final
  subLAbel: string;
}


@Component({
  selector: 'app-user-front',
  imports: [ CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-front.html',
})
export class UserFront {
  authService = inject(AuthService);
  user = computed(() => this.authService.user());
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'contratistas',
      route: '/contratistas',  // ← Correcto
      subLAbel: 'ver contratistas'
    },
    /*
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Financiera',
      route: '/dasboard/search',    // ← CORREGIDO: era "route" con 'a'
      subLAbel: 'Buscar Gifts'
    },*/
  ];

  constructor() {
    console.log('Menu options:', this.menuOptions); // ← Verifica en consola
    console.log('Number of items:', this.menuOptions.length);
  }

}
