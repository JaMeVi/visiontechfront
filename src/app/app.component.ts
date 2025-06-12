import { Component } from '@angular/core';
import { MetricasComponent } from "./components/metricas/metricas.component";

@Component({
  selector: 'app-root',
  imports: [MetricasComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontVisiontech';
}