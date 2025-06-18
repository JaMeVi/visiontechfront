import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListarRutasComponent } from './listar-rutas/listar-rutas.component';


@Component({
  selector: 'app-rutas',
  imports: [ListarRutasComponent,  RouterOutlet],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent {
    constructor(public route:ActivatedRoute){}


}
