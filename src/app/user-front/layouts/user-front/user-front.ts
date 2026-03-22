import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth/services/auth.service';
import { TopMenu } from "../../components/user-front-top-menu/top-menu";
import { MenuOption } from "../../interfaces/user-menu.interface";


@Component({
  selector: 'app-user-front',
  imports: [CommonModule, RouterOutlet, RouterLink, TopMenu],
  templateUrl: './user-front.html',
   styleUrl: './user-front.css'
})
export class UserFront implements OnInit {

  authService = inject(AuthService);
  user = computed(() => this.authService.user());
  selectedPages: string[] = [];
  selectedOption: MenuOption | null = null; //  cuál está activa
  menuOpen = false;

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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
