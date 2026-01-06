import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar.component/navbar.component";


@Component({
  selector: 'app-store-front-layaout',
  imports: [RouterOutlet, NavbarComponent,NavbarComponent],
  templateUrl: './store-front-layaout.html',
})
export class StoreFrontLayaout { }
