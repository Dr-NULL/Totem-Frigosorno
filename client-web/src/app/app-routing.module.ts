import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MetodoComponent } from './components/pages/cliente/metodo/metodo.component';
import { PrintRutComponent } from './components/pages/cliente/print-rut/print-rut.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
