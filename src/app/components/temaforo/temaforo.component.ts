import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTemaforoComponent } from './listar-temaforo/listar-temaforo.component';

@Component({
  selector: 'app-temaforo',
  imports: [ListarTemaforoComponent, RouterOutlet],
  templateUrl: './temaforo.component.html',
  styleUrl: './temaforo.component.css'
})
export class TemaforoComponent {
  constructor(public route:ActivatedRoute){}

}
