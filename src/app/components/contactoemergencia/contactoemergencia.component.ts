import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcontactoemergenciaComponent } from './listar-contactoemergencia/listar-contactoemergencia.component';

@Component({
  selector: 'app-contactoemergencia',
  imports: [ListarcontactoemergenciaComponent,RouterOutlet],
  templateUrl: './contactoemergencia.component.html',
  styleUrl: './contactoemergencia.component.css'
})
export class ContactoemergenciaComponent { 
  constructor(public route:ActivatedRoute){}
}
