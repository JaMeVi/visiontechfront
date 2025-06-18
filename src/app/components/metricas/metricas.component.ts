import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarMetricasComponent } from './listar-metricas/listar-metricas.component';

@Component({
  selector: 'app-metricas',
  imports: [ListarMetricasComponent, RouterOutlet],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent {
  constructor(public route:ActivatedRoute){}

}
