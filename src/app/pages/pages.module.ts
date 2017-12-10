import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {routing} from './pages.routing';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  providers: []
})
export class PagesModule { }
