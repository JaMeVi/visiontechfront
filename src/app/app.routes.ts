import { Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { AgregarActualizarRolesComponent } from './components/roles/agregar-actualizar-roles/agregar-actualizar-roles.component';
import { UsersComponent } from './components/users/users.component';
import { ListarUsuariosComponent } from './components/users/listar-usuarios/listar-usuarios.component';
import { AgregarActualizarUsuariosComponent } from './components/users/agregar-actualizar-usuarios/agregar-actualizar-usuarios.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { AgregarActualizarRutasComponent } from './components/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';
import { VerDetalleRutaComponent } from './components/rutas/ver-detalle-ruta/ver-detalle-ruta.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { AgregarActualizarRecomendacionesComponent } from './components/recomendaciones/agregar-actualizar-recomendaciones/agregar-actualizar-recomendaciones.component';
import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { AgregarActualizarIncidentesComponent } from './components/incidentes/agregar-actualizar-incidentes/agregar-actualizar-incidentes.component';
import { TemaforoComponent } from './components/temaforo/temaforo.component';
import { AgregarActualizarTemaforoComponent } from './components/temaforo/agregar-actualizar-temaforo/agregar-actualizar-temaforo.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { AgregarActualizarRespuestasComponent } from './components/respuestas/agregar-actualizar-respuestas/agregar-actualizar-respuestas.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { AgregarActualizarMetricasComponent } from './components/metricas/agregar-actualizar-metricas/agregar-actualizar-metricas.component';
import { CondicionesatmosfericasComponent } from './components/condicionesatmosfericas/condicionesatmosfericas.component';
import { AgregarActualizarCondicionesatmosfericasComponent } from './components/condicionesatmosfericas/agregar-actualizar-condicionesatmosfericas/agregar-actualizar-condicionesatmosfericas.component';
import { ContactoemergenciaComponent } from './components/contactoemergencia/contactoemergencia.component';
import { AgregarActualizarContactoemergenciaComponent } from './components/contactoemergencia/agregar-actualizar-contactoemergencia/agregar-actualizar-contactoemergencia.component';


export const routes: Routes = [// Ruta por defecto
    {
        path:'', redirectTo:'usuarios', pathMatch:'full'
    },
    {
        path:'usuarios', component:UsersComponent,
        children:[
            {
                path:'nuevo',component:AgregarActualizarUsuariosComponent
            },
            {
                path:'ediciones/:id',component:AgregarActualizarUsuariosComponent
            }
        ]

    },
];
   