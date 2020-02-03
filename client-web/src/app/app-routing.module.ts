import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InfoComponent } from './components/pages/info/info.component';
import { IndexComponent } from './components/pages/index/index.component';
import { Err404Component } from './components/pages/err404/err404.component';
import { TotemComponent } from './components/pages/cliente/totem/totem.component';
import { RegistroComponent } from './components/pages/cliente/registro/registro.component';
import { VisorColaComponent } from './components/pages/visor/visor-cola/visor-cola.component';
import { VisorServeComponent } from './components/pages/visor/visor-serve/visor-serve.component';
import { SelectTotemComponent } from './components/pages/visor/select-totem/select-totem.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'cliente/totem',
    component: TotemComponent
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
    path: 'visor/serve/:ip',
    component: VisorServeComponent
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
