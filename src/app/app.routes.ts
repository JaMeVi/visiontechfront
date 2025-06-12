import { Routes } from '@angular/router';
import { MetricasComponent } from './components/metricas/metricas.component';
import { InsertarmetricasComponent } from './components/metricas/insertarmetricas/insertarmetricas.component';

export const routes: Routes = [
    {
        path:'metricas',component:MetricasComponent,
        children:[
            {
                path:'nuevo', component:InsertarmetricasComponent
            }

        ]
    }


];
