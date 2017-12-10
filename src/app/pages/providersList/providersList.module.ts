import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ProvidersListComponent } from './providersList.component';
import { routing } from './providersList.routing';
import {NgaModule} from '../../theme/nga.module';

@NgModule({
  declarations: [
    ProvidersListComponent
  ],
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  providers: []
})
export class ProvidersListModule { }
