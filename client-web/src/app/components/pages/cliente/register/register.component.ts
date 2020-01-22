import { Component, DoCheck } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';
import { Router } from '@angular/router';

import { Layout, KeyboardComponent } from '../../../shared/keyboard/keyboard.component';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import * as moment from 'moment';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  dateMax = new Date();
  layoutRut: Layout = {
    name: 'RUT',
    rows: [
      [{ default: '1' }, { default: '2' }, { default: '3' }],
      [{ default: '4' }, { default: '5' }, { default: '6' }],
      [{ default: '7' }, { default: '8' }, { default: '9' }],
      [{ default: 'k' }, { default: '0' }, { default: '{back}' }],
      [{ default: '{enter}' }]
    ]
  };
  layoutTel: Layout = {
    name: 'RUT',
    rows: [
      [{ default: '1' }, { default: '2' }, { default: '3' }],
      [{ default: '4' }, { default: '5' }, { default: '6' }],
      [{ default: '7' }, { default: '8' }, { default: '9' }],
      [{ default: '{back}' }, { default: '0' }, { default: '{enter}' }]
    ]
  };

  rutValid = false;
  rut = '';
  nombres = '';
  apellidoP = '';
  apellidoM = '';
  fechaNacim = new Date();
  telefono = '';
  email = '';
  enabled = false;

  constructor(
    private router: Router,
    private rutServ: RutService,
    private snackCtrl: MatSnackBar,
    private clienteServ: ClienteService
  ) { }

  onBack() {
    this.rutValid = false;
    this.rut = '';
    this.nombres = '';
    this.apellidoP = '';
    this.apellidoM = '';
    this.fechaNacim = new Date();
    this.telefono = '';
    this.email = '';
    this.enabled = false;
    this.router.navigate(['/']);
  }

  pressEnter(keyboard: KeyboardComponent) {
    keyboard.hide();
  }

  checkDate(ev: MatDatepickerInputEvent<moment.Moment>) {
    this.fechaNacim = ev.value.toDate();
    this.onFocusOut();
  }

  checkRut() {
    this.rut = this.rutServ.format(this.rut);
    this.rutValid = this.rutServ.isValid(this.rut);

  }

  onFocusOutRut() {
    if (!this.rutValid) {
      this.snackCtrl.open(
        'El RUT ingresado no es válido.',
        'Aceptar',
        { duration: 2500 }
      );
    }

    this.onFocusOut();
  }

  onFocusOut() {
    const now = new Date();

    this.enabled = (
      (this.rutValid) &&
      (this.rut.length > 0) &&
      (this.nombres.length > 0) &&
      (this.apellidoP.length > 0) &&
      (this.apellidoM.length > 0) &&
      (
        this.fechaNacim.getFullYear() !== now.getFullYear() ||
        this.fechaNacim.getMonth() !== now.getMonth() ||
        this.fechaNacim.getDate() !== now.getDate()
      )
    );

    // console.log({
    //   rut: this.rut.trim(),
    //   nombres: this.nombres.trim(),
    //   apellidoP: this.apellidoP.trim(),
    //   apellidoM: this.apellidoM.trim(),
    //   fechaNac: this.fechaNacim,
    //   telefono: parseInt(this.telefono.trim(), 10),
    //   email: this.email.trim()
    // });
  }

  onRegister() {
    try {
      const req = {
        rut: this.rut.trim(),
        nombres: this.nombres.trim(),
        apellidoP: this.apellidoP.trim(),
        apellidoM: this.apellidoM.trim(),
        fechaNac: moment(this.fechaNacim, 'DD/MM/YYYY').toDate(),
        telefono: parseInt(this.telefono.trim(), 10),
        email: this.email.trim()
      };

      const res = this.clienteServ.registro(req);
    } catch (err) {
      this.snackCtrl.open(err.details, 'Aceptar', { duration: 2500 });
    }
  }
}
