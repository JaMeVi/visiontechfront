import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';

@Component({
  selector: 'app-users',
  imports: [ListarUsuariosComponent, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(public route:ActivatedRoute){}

}
