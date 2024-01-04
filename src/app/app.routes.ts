import { Routes } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'citas',
    component:CitasComponent
  },
  {
    path: 'configuraciones',
    component:ConfiguracionesComponent
  }
];
