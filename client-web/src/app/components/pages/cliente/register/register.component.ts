import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';
import { Layout, KeyboardComponent } from '../../../shared/keyboard/keyboard.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  dateMax = new Date();
  layout: Layout = {
    name: 'RUT',
    rows: [
      [{ default: '1' }, { default: '2' }, { default: '3' }],
      [{ default: '4' }, { default: '5' }, { default: '6' }],
      [{ default: '7' }, { default: '8' }, { default: '9' }],
      [{ default: 'k' }, { default: '0' }, { default: '{back}' }],
      [{ default: '{enter}' }]
    ]
  };

  rut = '';
  nombres = '';
  apellidoP = '';
  apellidoM = '';
  fechaNacim = '';

  constructor(
    private rutServ: RutService
  ) { }

  pressEnter(keyboard: KeyboardComponent) {
    keyboard.hide();
  }

  onRutChange() {
    this.rut = this.rutServ.format(this.rut);
    console.clear();
    console.log(this.rut);
    console.log(this.rutServ.isValid(this.rut));
  }
}
