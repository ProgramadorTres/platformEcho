import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'btn-home',
  imports: [],
  templateUrl: './btn-home.html',
})
export class BtnHome {

  pathToGo = input<keyof typeof this.paths>();
  constructor(private router: Router) {
    //console.log(`pathToGo :: ${this.pathToGo}`);
  }
  basePath = '/admin';

  paths = {
    'contratistas': `${this.basePath}/contratistas`,
    'home': `${this.basePath}`,
    'organizaciones': `${this.basePath}/organizaciones`,  
  }
  goHome = this.paths['home'];
  volver() {
    const path = this.pathToGo() ?? 'home';
    const route = this.paths[path];
    this.router.navigate([route]);
  }
}
