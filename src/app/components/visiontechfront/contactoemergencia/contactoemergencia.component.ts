import { Component } from '@angular/core';
import { ListarContactoemergenciaComponent } from "./listar-contactoemergencia/listar-contactoemergencia.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contactoemergencia',
  imports: [ListarContactoemergenciaComponent, RouterOutlet],
  templateUrl: './contactoemergencia.component.html',
  styleUrl: './contactoemergencia.component.css'
})
export class ContactoemergenciaComponent {
  constructor(public route:ActivatedRoute){}

}
