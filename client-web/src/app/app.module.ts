import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custon Modules
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

// Components
import { IndexComponent } from './components/pages/index/index.component';
import { TicketComponent } from './components/pages/cliente/ticket/ticket.component';
import { MetodoComponent } from './components/pages/cliente/metodo/metodo.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TicketComponent,
    MetodoComponent
  ],
  imports: [
    // System Modules
    BrowserModule,
    BrowserAnimationsModule,

    // Custom Modules
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
