import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmetricasComponent } from './listarmetricas/listarmetricas.component';

@Component({
  selector: 'app-metricas',
  imports: [ListarmetricasComponent,RouterOutlet],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent {
   constructor(public route:ActivatedRoute){}
}
