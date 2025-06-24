import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecomendacionesComponent } from "./listarrecomendaciones/listarrecomendaciones.component";

@Component({
  selector: 'app-recomendaciones',
  imports: [ListarrecomendacionesComponent, RouterOutlet],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent {
  constructor(public route:ActivatedRoute){}

}
