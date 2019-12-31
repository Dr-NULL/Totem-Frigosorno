import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MetodoComponent } from './components/pages/cliente/metodo/metodo.component';
import { TicketComponent } from './components/pages/cliente/ticket/ticket.component';

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
    path: 'cliente/ticket',
    component: TicketComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
