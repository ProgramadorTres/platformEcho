import { style } from '@angular/animations';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { TopMenu } from '@dashboard/components/top-menu/top-menu';
import { MenuOption } from '@dashboard/interfaces/admin-menu-option.interface';


@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TopMenu],
  templateUrl: './admin-dashboard-layout.html',
  styleUrl: './admin-dashboard-layout.css'
})
export class AdminDashboardLayout implements OnInit {
  authService = inject(AuthService);
  user = computed(() => this.authService.user());
  selectedPages: string[] = [];

  selectedOption: MenuOption | null = null; // Para rastrear cuál está activa

  menuOptions: MenuOption[] = [
    {
      icon: 'bi bi-scales fs-4',
      label: 'jurídica',
      subLAbel: 'módulo jurídica',
      pages: ['convenios', 'contratos', 'contratistas', 'organizaciones', 'coordinadores']
    },

    {
      icon: 'fa-solid fa-chart-line',
      label: 'Financiera',
      subLAbel: 'Buscar Gifts'
    },
  ];

  selectMenu(option: MenuOption) {
    this.selectedOption = option; // Guardamos la referencia de la opción clicada
    this.selectedPages = option.pages ?? [];
    console.log("pages ", this.selectedPages);
  }

  ngOnInit() {
    this.selectedPages = this.menuOptions[0].pages ?? [];
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
