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

export const routes: Routes = [
  {
    path: 'rutas', component:ListarRutasComponent,
    children: [
      {path: 'detalle/:id', component:VerDetalleRutaComponent},
      { path: 'nuevo', component: AgregarActualizarRutasComponent },
      { path: 'editar/:id', component: AgregarActualizarRutasComponent } // opcional
    ]
  },
  {
    path: 'recomendaciones', component:ListarRecomendacionesComponent,
    children: [
      { path: 'nuevo', component: AgregarActualizarRecomendacionesComponent },
      { path: 'editar/:id', component: AgregarActualizarRecomendacionesComponent } // opcional
    ]
  },
  {
    path: 'incidentes', component:ListarIncidentesComponent,
    children: [
      { path: 'nuevo', component: AgregarActualizarIncidentesComponent },
      { path: 'editar/:id', component: AgregarActualizarIncidentesComponent } // opcional
    ]
  },
  {
    path: 'temaforos', component:ListarTemaforoComponent,
    children: [
      { path: 'nuevo', component: AgregarActualizarTemaforoComponent },
      { path: 'editar/:id', component: AgregarActualizarTemaforoComponent } // opcional
    ]
  },
];
