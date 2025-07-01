import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTemasforoComponent } from "./listar-temasforo/listar-temasforo.component";

@Component({
  selector: 'app-temasforo',
  imports: [ListarTemasforoComponent, RouterOutlet],
  templateUrl: './temasforo.component.html',
  styleUrl: './temasforo.component.css'
})
export class TemasforoComponent {
  constructor(public route:ActivatedRoute){}

}
