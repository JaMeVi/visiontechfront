import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCondicionesatmosfericasComponent } from './listar-condicionesatmosfericas/listar-condicionesatmosfericas.component';

@Component({
  selector: 'app-condicionesatmosfericas',
  imports: [ListarCondicionesatmosfericasComponent, RouterOutlet],
  templateUrl: './condicionesatmosfericas.component.html',
  styleUrl: './condicionesatmosfericas.component.css'
})
export class CondicionesatmosfericasComponent {
  constructor(public route:ActivatedRoute){}

}
