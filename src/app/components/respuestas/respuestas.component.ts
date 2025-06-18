import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRespuestasComponent } from "./listar-respuestas/listar-respuestas.component";

@Component({
  selector: 'app-respuestas',
  imports: [ RouterOutlet, ListarRespuestasComponent],
  templateUrl: './respuestas.component.html',
  styleUrl: './respuestas.component.css'
})
export class RespuestasComponent {
  constructor(public route:ActivatedRoute){}

}
