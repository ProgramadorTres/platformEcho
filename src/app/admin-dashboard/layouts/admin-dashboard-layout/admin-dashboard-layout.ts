import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { TopMenu } from '@dashboard/components/top-menu/top-menu';
import { MenuOption } from '@dashboard/interfaces/admin-menu-option.interface';


@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TopMenu],
  templateUrl: './admin-dashboard-layout.html',
})
export class AdminDashboardLayout  implements OnInit{
  authService = inject(AuthService);
  user = computed(() => this.authService.user());
  selectedPages: string[] = [];

  menuOptions: MenuOption[] = [
    {
      icon: 'bi bi-scales fs-4',
      label: 'jurídica',
      //route: '/dasboard/juridica',  // ← Correcto
      subLAbel: 'módulo jurídica',
      pages: ['convenios', 'contratos', 'contratistas', 'organizaciones', 'coordinadores']
    },

    {
      icon: 'fa-solid fa-chart-line',
      label: 'Financiera',
      //route: '/dasboard/search',    // ← CORREGIDO: era "route" con 'a'
      subLAbel: 'Buscar Gifts'
    },
  ];


  selectMenu(option: MenuOption) {
    this.selectedPages = option.pages ?? [];
    console.log("pages ", this.selectedPages);

  }


  ngOnInit() {
    // 👇 Carga por defecto la primera opción
    this.selectedPages = this.menuOptions[0].pages ?? [];
  }

}
