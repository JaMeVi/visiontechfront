import { InsertarEditarUsuariosComponent } from './components/usuarios/insertar-editar-usuarios/insertar-editar-usuarios.component';
import { InsertarEditarIncidentesComponent } from './components/incidentes/insertar-editar-incidentes/insertar-editar-incidentes.component';
import { InsertarEditarCatmosfericasComponent } from './components/catmosfericas/insertar-editar-catmosfericas/insertar-editar-catmosfericas.component';
import { CEmergencia } from './models/contactoemergencia';
import { Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { CatmosfericasComponent } from './components/catmosfericas/catmosfericas.component';
import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { ContactoEmergenciaComponent } from './components/contacto-emergencia/contacto-emergencia.component';
import { InsertarEditarMetricasComponent } from './components/metricas/insertar-editar-metricas/insertar-editar-metricas.component';
import { AgregarActualizarRutasComponent } from './components/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';

import { InsertarEditarRolesComponent } from './components/roles/insertar-editar-roles/insertar-editar-roles.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InsertarEditarRecomendacionesComponent } from './components/recomendaciones/insertar-editar-recomendaciones/insertar-editar-recomendaciones.component';

export const routes: Routes = [
    { path: '',
    redirectTo: 'login',
    pathMatch: 'full',},
     {
    path: 'login',
    component: LoginComponent,
  },
   {
        path:'',redirectTo:'usuarios',pathMatch:'full'
    },
    {path:'roles',component:RolesComponent, children:[
            {path:'inserciones',component:InsertarEditarRolesComponent},
            {path:'ediciones/:id',component:InsertarEditarRolesComponent},],
         canActivate: [seguridadGuard],},
    {path:'usuarios',component:UsuariosComponent,
         children:[
            {path:'inserciones',component:InsertarEditarUsuariosComponent},
            {path:'ediciones/:id',component:InsertarEditarUsuariosComponent},],
         canActivate: [seguridadGuard],},
    {path:'rutas',component:RutasComponent,
        children:[
            {path:'inserciones',component:AgregarActualizarRutasComponent},
            {path:'ediciones/:id',component:AgregarActualizarRutasComponent},],
         canActivate: [seguridadGuard],},
    {path:'metricas',component:MetricasComponent,  
        children:[
            {path:'inserciones',component:InsertarEditarMetricasComponent},
            {path:'ediciones/:id',component:InsertarEditarMetricasComponent},],
         canActivate: [seguridadGuard],},
    {path:'catmosferica',component:CatmosfericasComponent,
        children:[
            {path:'inserciones',component:InsertarEditarCatmosfericasComponent},
            {path:'ediciones/:id',component:InsertarEditarCatmosfericasComponent},],
         canActivate: [seguridadGuard],},
    {path:'incidentes',component:IncidentesComponent,
        children:[
            {path:'inserciones',component:InsertarEditarIncidentesComponent},
            {path:'ediciones/:id',component:InsertarEditarIncidentesComponent},],
         canActivate: [seguridadGuard],} ,
    {path:'recomendaciones',component:RecomendacionesComponent,
        children:[
            {path:'inserciones', component:InsertarEditarRecomendacionesComponent},
            {path:'ediciones/:id',component:InsertarEditarRecomendacionesComponent},],
            canActivate: [seguridadGuard],},
    {path:'contactoemergencia',component:ContactoEmergenciaComponent},
     {
    path: 'homes',
    component: HomeComponent,
        canActivate: [seguridadGuard],

  },

];
