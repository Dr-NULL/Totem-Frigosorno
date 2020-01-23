import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

// Components
import { AppComponent } from './app.component';
import { IndexComponent } from './components/pages/index/index.component';
import { PrintRutComponent } from './components/pages/cliente/print-rut/print-rut.component';
import { MetodoComponent } from './components/pages/cliente/metodo/metodo.component';
import { InfoComponent } from './components/pages/info/info.component';
import { Err404Component } from './components/pages/err404/err404.component';
import { SimpleModalComponent } from './components/shared/simple-modal/simple-modal.component';
import { RegistroComponent } from './components/pages/cliente/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PrintRutComponent,
    MetodoComponent,
    InfoComponent,
    Err404Component,
    SimpleModalComponent,
    RegistroComponent
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
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  entryComponents: [
    SimpleModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
