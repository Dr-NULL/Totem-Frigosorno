import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InfoComponent } from './components/pages/info/info.component';
import { Err404Component } from './components/pages/err404/err404.component';
import { MetodoComponent } from './components/pages/cliente/metodo/metodo.component';
import { RegistroComponent } from './components/pages/cliente/registro/registro.component';
import { PrintRutComponent } from './components/pages/cliente/print-rut/print-rut.component';
import { VisorColaComponent } from './components/pages/visor/visor-cola/visor-cola.component';
import { SelectTotemComponent } from './components/pages/visor/select-totem/select-totem.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente/metodo',
    pathMatch: 'full'
  },
  {
    path: 'cliente/metodo',
    component: MetodoComponent
  },
  {
    path: 'cliente/print-rut',
    component: PrintRutComponent
  },
  {
    path: 'cliente/registro',
    component: RegistroComponent
  },
  {
    path: 'visor/select',
    component: SelectTotemComponent
  },
  {
    path: 'visor/cola/:ip',
    component: VisorColaComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Err404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
