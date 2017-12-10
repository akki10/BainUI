import { Routes, RouterModule } from '@angular/router';
import { ProvidersListComponent } from './providersList.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ProvidersListComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
