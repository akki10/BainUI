import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'providers', pathMatch: 'full'},
      {path: 'providers', loadChildren: 'app/pages/providersList/providersList.module#ProvidersListModule'}
    ],
    // canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
