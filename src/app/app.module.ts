import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import {routing} from './app.routing';
import { NgaModule } from './theme/nga.module';
import {DataService} from './data.service';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgaModule,
    HttpModule,
    PagesModule,
    routing
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
