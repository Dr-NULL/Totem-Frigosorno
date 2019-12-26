import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custon Modules
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

// Components
import { IndexComponent } from './components/pages/index/index.component';
import { NumpadComponent } from './components/shared/numpad/numpad.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NumpadComponent
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
