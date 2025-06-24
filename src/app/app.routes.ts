import { Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import path from 'path';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { AgregarActualizarRutasComponent } from './components/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';
import { AgregarActualizarUsuariosComponent } from './components/usuarios/agregar-actualizar-usuarios/agregar-actualizar-usuarios.component';
import { AgregarActualizarRolesComponent } from './components/roles/agregar-actualizar-roles/agregar-actualizar-roles.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { AgregarActualizarRecomendacionesComponent } from './components/recomendaciones/agregar-actualizar-recomendaciones/agregar-actualizar-recomendaciones.component';
import { MenuComponent } from './components/menu/menu.component';
import { Incidente } from './models/incidentes';
import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { InsertarEditarIncidentesComponent } from './components/incidentes/insertar-editar-incidentes/insertar-editar-incidentes.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { InsertarEditarMetricasComponent } from './components/metricas/insertar-editar-metricas/insertar-editar-metricas.component';

export const routes: Routes = [
    {path:'',redirectTo:'roles', pathMatch:'full'   },
    {path:'menu', component:MenuComponent,},
    {path:'roles',component:RolesComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarRolesComponent,
            },
            {
                path:'ediciones/:id', component:AgregarActualizarRolesComponent
            }
        ]
    },
    {path:'usuarios',component:UsuariosComponent,
        children:[
            {
                path:'nuevo', component:AgregarActualizarUsuariosComponent,
            },
            {
                path:'ediciones/:id', component:AgregarActualizarUsuariosComponent
            }
        ]
    },
    {path:'rutas',component:RutasComponent, 
        children:[
            {
                path:'nuevo',
                component:AgregarActualizarRutasComponent,
            },
            {
                path:'ediciones/:id',   
                component:AgregarActualizarRutasComponent,
            }
        ]
    },
    {
        path:'recomendaciones', component:RecomendacionesComponent,
        children:[
            {
                path:'nuevo',component:AgregarActualizarRecomendacionesComponent,
            },
            {
                path:'ediciones/:id', component:AgregarActualizarRecomendacionesComponent,
            }
        ]
    },
    {
        path:'incidentes', component:IncidentesComponent,
        children:[
            {
                path:'nuevo', component:InsertarEditarIncidentesComponent,
            },
            {
                path:'ediciones/:id',component:InsertarEditarIncidentesComponent,
            }
        ]
    },
    {
        path:'metricas', component:MetricasComponent,
        children:[
            {
                path:'nuevo', component:InsertarEditarMetricasComponent,
            },
            {
                path:'ediciones/:id', component:InsertarEditarMetricasComponent,
            }
        ]
    }

];
