import { Routes } from '@angular/router';
import { ListarRutasComponent } from './components/rutas/listar-rutas/listar-rutas.component';
import { AgregarActualizarRutasComponent } from './components/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';

import { ListarRecomendacionesComponent } from './components/recomendaciones/listar-recomendaciones/listar-recomendaciones.component';
import { AgregarActualizarRecomendacionesComponent } from './components/recomendaciones/agregar-actualizar-recomendaciones/agregar-actualizar-recomendaciones.component';
import { VerDetalleRutaComponent } from './components/rutas/ver-detalle-ruta/ver-detalle-ruta.component';
import { ListarIncidentesComponent } from './components/incidentes/listar-incidentes/listar-incidentes.component';
import { AgregarActualizarIncidentesComponent } from './components/incidentes/agregar-actualizar-incidentes/agregar-actualizar-incidentes.component';
import { ListarTemaforoComponent } from './components/temaforo/listar-temaforo/listar-temaforo.component';
import { AgregarActualizarTemaforoComponent } from './components/temaforo/agregar-actualizar-temaforo/agregar-actualizar-temaforo.component';
import { ComponentsComponent } from './components/components.component';

export const routes: Routes = [// Ruta por defecto
      {
        path: 'rutas', 
        component: ComponentsComponent,
        children: [
          
          { path: 'nuevo', component: AgregarActualizarRutasComponent },
          { path: 'ediciones/:id', component: AgregarActualizarRutasComponent },
           { path: 'detalle/:id', component: VerDetalleRutaComponent },
        ]
      },
      {
        path: 'recomendaciones', 
        component: ListarRecomendacionesComponent,
        children: [
          { path: 'nuevo', component: AgregarActualizarRecomendacionesComponent },
          { path: 'ediciones/:id', component: AgregarActualizarRecomendacionesComponent }
        ]
      },
      {
        path: 'incidentes', 
        component: ListarIncidentesComponent,
        children: [
          { path: 'nuevo', component: AgregarActualizarIncidentesComponent },
          { path: 'ediciones/:id', component: AgregarActualizarIncidentesComponent }
        ]
      },
      {
        path: 'temaforos', 
        component: ListarTemaforoComponent,
        children: [
          { path: 'nuevo', component: AgregarActualizarTemaforoComponent },
          { path: 'ediciones/:id', component: AgregarActualizarTemaforoComponent }
        ]
      }
    ];