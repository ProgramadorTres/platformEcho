import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';



interface MenuOption {
  icon: string;
  label: string;
  route: string;  // ← Correcto: con 'e' al final
  subLAbel: string;
}


@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './side-menu.html',
})
export class SideMenu { 
   menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'jurídica',
      route: '/dasboard/juridica',  // ← Correcto
      subLAbel: 'módulo jurídica'
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
