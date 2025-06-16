import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarIncidentesComponent } from "./listar-incidentes/listar-incidentes.component";

@Component({
  selector: 'app-incidentes',
  imports: [ListarIncidentesComponent, RouterOutlet],
  templateUrl: './incidentes.component.html',
  styleUrl: './incidentes.component.css'
})
export class IncidentesComponent {
  constructor(public route:ActivatedRoute){
  }

}
