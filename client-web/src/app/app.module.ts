import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custon Modules
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

// Components
import { IndexComponent } from './components/pages/index/index.component';
import { PrintRutComponent } from './components/pages/cliente/print-rut/print-rut.component';
import { MetodoComponent } from './components/pages/cliente/metodo/metodo.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PrintRutComponent,
    MetodoComponent
  ],
  imports: [
    // System Modules
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Custom Modules
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
