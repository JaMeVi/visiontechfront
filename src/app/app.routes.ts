import { CEmergencia } from './models/contactoemergencia';
import { Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import path from 'path';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { CatmosfericasComponent } from './components/catmosfericas/catmosfericas.component';
import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { ContactoEmergenciaComponent } from './components/contacto-emergencia/contacto-emergencia.component';
import { InsertarEditarMetricasComponent } from './components/metricas/insertar-editar-metricas/insertar-editar-metricas.component';

export const routes: Routes = [
    {path:'',redirectTo:'roles', pathMatch:'full'},
    {path:'roles',component:RolesComponent},
    {path:'usuarios',component:UsuariosComponent},
    {path:'rutas',component:RutasComponent},
    
    {path:'metricas',component:MetricasComponent,
        children:[
            {
                path:'inserciones',component:InsertarEditarMetricasComponent

            },
                 {
                path:'ediciones/:id',component:InsertarEditarMetricasComponent
                
            },
        ]
    },
    {path:'catmosferica',component:CatmosfericasComponent}   ,
    {path:'incidentes',component:IncidentesComponent} ,
    {path:'recomendaciones',component:RecomendacionesComponent},
    {path:'contactoemergencia',component:ContactoEmergenciaComponent}  

];
