import { Component } from '@angular/core';
import { ListarRutasComponent } from '../../rutas/listar-rutas/listar-rutas.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ListarRutasComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public route:ActivatedRoute){}
  
}