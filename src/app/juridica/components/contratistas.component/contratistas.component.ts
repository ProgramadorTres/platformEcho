import { Component, input } from '@angular/core';
import { Contratista } from '../../interfaces/contratista.interface';

@Component({
  selector: 'contratistas',
  imports: [],
  templateUrl: './contratistas.component.html',
})
export class ContratistasComponent { 
   contratista = input.required<Contratista>();

}
