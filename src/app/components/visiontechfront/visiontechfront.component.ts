import { Component } from '@angular/core';
import { ListarUsuariosComponent } from './users/listar-usuarios/listar-usuarios.component';
import { RouterOutlet, ActivatedRoute} from '@angular/router';
import { ListarRutasComponent } from './rutas/listar-rutas/listar-rutas.component';
import { RolesComponent } from "./roles/roles.component";

@Component({
  selector: 'app-visiontechfront',
  imports: [ RouterOutlet, RolesComponent],
  templateUrl: './visiontechfront.component.html',
  styleUrl: './visiontechfront.component.css'
})
export class VisiontechfrontComponent {
   constructor(public route:ActivatedRoute){}

}
