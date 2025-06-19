import { Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import path from 'path';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RutasComponent } from './components/rutas/rutas.component';

export const routes: Routes = [
    {path:'',redirectTo:'roles', pathMatch:'full'   },
    {path:'roles',component:RolesComponent},
    {path:'usuarios',component:UsuariosComponent},
    {path:'rutas',component:RutasComponent}

];
