import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRutasComponent } from "./rutas/listar-rutas/listar-rutas.component";

@Component({
  selector: 'app-components',
  imports: [ListarRutasComponent, RouterOutlet],
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {
  constructor(public route:ActivatedRoute){}

}
