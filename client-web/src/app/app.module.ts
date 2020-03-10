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
import { TotemComponent } from './components/pages/cliente/totem/totem.component';
import { InfoComponent } from './components/pages/info/info.component';
import { Err404Component } from './components/pages/err404/err404.component';
import { RegistroComponent } from './components/pages/cliente/registro/registro.component';
import { ModalBasicComponent } from './components/shared/modal-basic/modal-basic.component';
import { ModalCustomComponent } from './components/shared/modal-custom/modal-custom.component';
import { KeyboardComponent } from './components/shared/keyboard/keyboard.component';
import { KeyboardDirective } from './components/shared/keyboard/keyboard.directive';
import { SelectTotemComponent } from './components/pages/visor/select-totem/select-totem.component';
import { VisorColaComponent } from './components/pages/visor/visor-cola/visor-cola.component';
import { VisorServeComponent } from './components/pages/visor/visor-serve/visor-serve.component';
import { TooltipComponent } from './components/shared/tooltip/tooltip.component';
import { DatepickerComponent } from './components/shared/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TotemComponent,
    InfoComponent,
    Err404Component,
    RegistroComponent,
    ModalBasicComponent,
    ModalCustomComponent,
    KeyboardComponent,
    KeyboardDirective,
    SelectTotemComponent,
    VisorColaComponent,
    VisorServeComponent,
    TooltipComponent,
    DatepickerComponent
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
      url: location.origin,
      options: {
        transports: ['polling', 'websocket'],
        autoConnect: true,
        reconnection: true
      }
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
