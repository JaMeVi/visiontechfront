import { InsertarEditarIncidentesComponent } from './components/incidentes/insertar-editar-incidentes/insertar-editar-incidentes.component';
import { InsertarEditarCatmosfericasComponent } from './components/catmosfericas/insertar-editar-catmosfericas/insertar-editar-catmosfericas.component';
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
import { AgregarActualizarRutasComponent } from './components/rutas/agregar-actualizar-rutas/agregar-actualizar-rutas.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {path:'',redirectTo:'roles', pathMatch:'full'},
    {path:'roles',component:RolesComponent},
    {path:'usuarios',component:UsuariosComponent},
    {path:'rutas',component:RutasComponent,
        children:[
            {path:'inserciones',component:AgregarActualizarRutasComponent},
            {path:'ediciones/:id',component:AgregarActualizarRutasComponent},]},
    {path:'metricas',component:MetricasComponent,  
        children:[
            {path:'inserciones',component:InsertarEditarMetricasComponent},
            {path:'ediciones/:id',component:InsertarEditarMetricasComponent},]},
    {path:'catmosferica',component:CatmosfericasComponent,
        children:[
            {path:'inserciones',component:InsertarEditarCatmosfericasComponent},
            {path:'ediciones/:id',component:InsertarEditarCatmosfericasComponent},]},
    {path:'incidentes',component:IncidentesComponent,
        children:[
            {path:'inserciones',component:InsertarEditarIncidentesComponent},
            {path:'ediciones/:id',component:InsertarEditarIncidentesComponent},]} ,
    {path:'recomendaciones',component:RecomendacionesComponent},
    {path:'contactoemergencia',component:ContactoEmergenciaComponent}  

];
