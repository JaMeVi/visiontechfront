import { Routes } from '@angular/router';
import { ListarRutasComponent } from './components/rutas/listar-rutas/listar-rutas.component';
import { AgregarActualizarRutasComponent } from './components/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';

import { ListarRecomendacionesComponent } from './components/recomendaciones/listar-recomendaciones/listar-recomendaciones.component';
import { AgregarActualizarRecomendacionesComponent } from './components/recomendaciones/agregar-actualizar-recomendaciones/agregar-actualizar-recomendaciones.component';

export const routes: Routes = [
  {
    path: 'rutas',
    children: [
      { path: '', component: ListarRutasComponent },
      { path: 'nuevo', component: AgregarActualizarRutasComponent },
      { path: 'editar/:id', component: AgregarActualizarRutasComponent } // opcional
    ]
  },
  {
    path: 'recomendaciones',
    children: [
      { path: '', component: ListarRecomendacionesComponent },
      { path: 'nuevo', component: AgregarActualizarRecomendacionesComponent },
      { path: 'editar/:id', component: AgregarActualizarRecomendacionesComponent } // opcional
    ]
  },
  { path: '', redirectTo: 'rutas', pathMatch: 'full' },
  { path: '**', redirectTo: 'rutas' } // catch-all
];
