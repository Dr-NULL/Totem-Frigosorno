import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Socket.IO
import { SocketIoModule } from 'ngx-socket-io';

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
import { RegistroComponent } from './components/pages/cliente/registro/registro.component';
import { ModalBasicComponent } from './components/shared/modal-basic/modal-basic.component';
import { ModalCustomComponent } from './components/shared/modal-custom/modal-custom.component';
import { KeyboardComponent } from './components/shared/keyboard/keyboard.component';
import { KeyboardDirective } from './directives/keyboard/keyboard.directive';
import { SelectTotemComponent } from './components/pages/visor/select-totem/select-totem.component';
import { VisorColaComponent } from './components/pages/visor/visor-cola/visor-cola.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PrintRutComponent,
    MetodoComponent,
    InfoComponent,
    Err404Component,
    RegistroComponent,
    ModalBasicComponent,
    ModalCustomComponent,
    KeyboardComponent,
    KeyboardDirective,
    SelectTotemComponent,
    VisorColaComponent
  ],
  imports: [
    // System Modules
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Custom Modules
    AppRoutingModule,
    AppMaterialModule,
    SocketIoModule.forRoot({
      url: location.origin
    })
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  entryComponents: [
    ModalBasicComponent,
    ModalCustomComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
