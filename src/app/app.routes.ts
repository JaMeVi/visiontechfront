import { Routes } from '@angular/router';
import { AgregarActualizarUsuariosComponent } from './components/visiontechfront/users/agregar-actualizar-usuarios/agregar-actualizar-usuarios.component';
import { AgregarActualizarRutasComponent } from './components/visiontechfront/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';
import { VerDetalleRutaComponent } from './components/visiontechfront/rutas/ver-detalle-ruta/ver-detalle-ruta.component';
import { RolesComponent } from './components/visiontechfront/roles/roles.component';
import { AgregarActualizarRolesComponent } from './components/visiontechfront/roles/agregar-actualizar-roles/agregar-actualizar-roles.component';
import { UsersComponent } from './components/visiontechfront/users/users.component';
import { RutasComponent } from './components/visiontechfront/rutas/rutas.component';
import { RecomendacionesComponent } from './components/visiontechfront/recomendaciones/recomendaciones.component';
import { AgregarActualizarRecomendacionesComponent } from './components/visiontechfront/recomendaciones/agregar-actualizar-recomendaciones/agregar-actualizar-recomendaciones.component';
import { IncidentesComponent } from './components/visiontechfront/incidentes/incidentes.component';
import { AgregarActualizarIncidentesComponent } from './components/visiontechfront/incidentes/agregar-actualizar-incidentes/agregar-actualizar-incidentes.component';
import { TemaforoComponent } from './components/visiontechfront/temaforo/temaforo.component';
import { AgregarActualizarTemaforoComponent } from './components/visiontechfront/temaforo/agregar-actualizar-temaforo/agregar-actualizar-temaforo.component';
import { RespuestasComponent } from './components/visiontechfront/respuestas/respuestas.component';
import { AgregarActualizarRespuestasComponent } from './components/visiontechfront/respuestas/agregar-actualizar-respuestas/agregar-actualizar-respuestas.component';
import { MetricasComponent } from './components/visiontechfront/metricas/metricas.component';
import { AgregarActualizarMetricasComponent } from './components/visiontechfront/metricas/agregar-actualizar-metricas/agregar-actualizar-metricas.component';
import { CondicionesatmosfericasComponent } from './components/visiontechfront/condicionesatmosfericas/condicionesatmosfericas.component';
import { AgregarActualizarCondicionesatmosfericasComponent } from './components/visiontechfront/condicionesatmosfericas/agregar-actualizar-condicionesatmosfericas/agregar-actualizar-condicionesatmosfericas.component';
import { ContactoemergenciaComponent } from './components/visiontechfront/contactoemergencia/contactoemergencia.component';
import { AgregarActualizarContactoemergenciaComponent } from './components/visiontechfront/contactoemergencia/agregar-actualizar-contactoemergencia/agregar-actualizar-contactoemergencia.component';
import { BuscarPorusernameComponent } from './components/visiontechfront/users/buscar-porusername/buscar-porusername.component';

export const routes: Routes = [// Ruta por defecto

    {path: 'roles', component:RolesComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarRolesComponent
            },
            {
                path:'ediciones/:id', component:AgregarActualizarRolesComponent
            }
        ]

    },

    {path:'usuarios', component:UsersComponent,
        children:[
            {
                path:'nuevo',component:AgregarActualizarUsuariosComponent
            },
            {
                path:'ediciones/:id',   component:AgregarActualizarUsuariosComponent
            },
            {
                path:'busquedas', component:BuscarPorusernameComponent
            }
        ]

    },
    {
        path:'rutas',component:RutasComponent,
        children:[
            {
                path:'nuevo',component:AgregarActualizarRutasComponent
            },
            {
                path:'ediciones/:id', component:AgregarActualizarRutasComponent
            },
            {path: 'detalle/:id', component:VerDetalleRutaComponent},
        ]
    },
    {path:'recomendaciones', component:RecomendacionesComponent,
        children:[
            {
                path:'nuevo',component:AgregarActualizarRecomendacionesComponent
            },
            {
                path:'ediciones/:id', component:AgregarActualizarRecomendacionesComponent
            }
        ]
    },
    {path:'incidentes', component:IncidentesComponent,
        children:[
            {
                path:'nuevo',component:AgregarActualizarIncidentesComponent
            },
            {
                path:'ediciones/:id',component:AgregarActualizarIncidentesComponent 
                       }
            ]
    },
    {
        path:'temaforos', component:TemaforoComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarTemaforoComponent
            },
            {
                path:'ediciones/:id',component:AgregarActualizarTemaforoComponent
            }
        ]
    },
    {
        path:'respuesta', component:RespuestasComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarRespuestasComponent
            },
            {
                path:'ediciones/:id',component:AgregarActualizarRespuestasComponent
            }
        ]
    },
    {
        path:'metricas', component:MetricasComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarMetricasComponent
            },
            {
                path:'ediciones/:id', component:AgregarActualizarMetricasComponent
            }
        ]
    },
    {
        path:'catmosferica', component:CondicionesatmosfericasComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarCondicionesatmosfericasComponent
            },
            {
                path:'ediciones/:id', component:AgregarActualizarCondicionesatmosfericasComponent
            }
        ]
    },
    {
        path:'contactoemergencia', component:ContactoemergenciaComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarContactoemergenciaComponent
            }, 
            {
                path:'ediciones/:id', component:AgregarActualizarContactoemergenciaComponent
            }
        ]
    }
    ];