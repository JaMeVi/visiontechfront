import { Component } from '@angular/core';
import { AdminComponent } from './components/principal/admin/admin.component';
import { MetricasComponent } from "./components/metricas/metricas.component";

@Component({
  selector: 'app-root',
  imports: [AdminComponent, MetricasComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontVisiontech';
}