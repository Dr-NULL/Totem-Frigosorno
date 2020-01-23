import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { RutService } from 'src/app/services/rut/rut.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { VoucherService } from 'src/app/services/voucher/voucher.service';
import { FormatterService } from 'src/app/services/formatter/formatter.service';

import { SimpleModalComponent, SimpleModalData } from 'src/app/components/shared/simple-modal/simple-modal.component';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements AfterViewInit {
  enabled = false;
  maxDate = new Date();

  rut = '';
  rutIsValid = false;
  nombres = '';
  apellidoP = '';
  apellidoM = '';
  fechaNac: Date;
  phone = '';
  phoneIsValid = false;
  email = '';
  emailIsValid = false;

  constructor(
    private rutServ: RutService,
    private routerCtrl: Router,
    private dialogCtrl: MatDialog,
    private formatServ: FormatterService,
    private voucherServ: VoucherService,
    private clienteServ: ClienteService
  ) { }

  ngAfterViewInit() {
    this.rut = '';
    this.rutIsValid = false;
    this.nombres = '';
    this.apellidoP = '';
    this.apellidoM = '';
    this.fechaNac = null;
    this.phone = '';
    this.phoneIsValid = false;
    this.email = '';
    this.emailIsValid = false;
  }

  // Formatear RUT mientras se escribe
  onKeyUpRut() {
    this.rut = this.rutServ.format(this.rut);
  }

  // Validar RUT
  async onBlurRut(ref: HTMLInputElement) {
    this.rutIsValid = this.rutServ.isValid(this.rut);
    this.onBlurAll();

    if (!this.rutIsValid) {
      await this.openDialog(
        'ERROR!',
        'El RUT que ha ingresado no es válido, por favor verifique'
        + 'que los números ingresados sean los correctos.',
        2500
      );
      ref.focus();
    }
  }

  async onBlurPhone(ref: HTMLInputElement) {
    this.phone = this.phone.trim();
    if (this.phone.length === 0) {
      this.phoneIsValid = true;
      this.onBlurAll();
    } else {
      this.phoneIsValid = !isNaN(parseInt(this.phone, 10));
      this.onBlurAll();

      if (!this.phoneIsValid) {
        await this.openDialog(
          'ERROR!',
          'El Número Telefónico que ha ingresado no es válido, por favor verifique'
          + 'que los números ingresados sean los correctos. Si no desea colocar '
          + 'su número puede omitir este campo.',
          2500
        );
        this.phone = '';
        ref.focus();
      }
    }
  }

  async onBlurEmail(ref: HTMLInputElement) {
    this.email = this.email.trim();
    if (this.email.length === 0) {
      this.emailIsValid = true;
      this.onBlurAll();
    } else {
      this.emailIsValid = this.formatServ.isEmail(this.email);
      this.onBlurAll();

      if (!this.emailIsValid) {
        await this.openDialog(
          'ERROR!',
          'El Email que ha ingresado no es válido, por favor verifique'
          + 'que su correo se haya ingresado con el formato correcto '
          + '(ej: ejemplo@proveedor.com). Si no desea colocar'
          + 'su Email puede omitir este campo.',
          2500
        );
        this.email = '';
        ref.focus();
      }
    }
  }

  // Escribir Fecha Seleccionada
  onCheckDate(data: moment.Moment) {
    this.fechaNac = data.toDate();
    this.onBlurAll();
  }

  // Chequea el estado de todos los Inputs
  onBlurAll() {
    this.enabled = (
      (this.rutIsValid) &&
      (this.nombres.length > 0) &&
      (this.apellidoP.length > 0) &&
      (this.apellidoM.length > 0) &&
      (this.fechaNac != null) &&
      (this.phoneIsValid ||
        (this.phone.length === 0)
      ) &&
      (this.emailIsValid ||
        (this.email.length === 0)
      )
    );
  }

  openDialog(title: string, message: string, duration: number = null) {
    return new Promise(resolve => {
      const ref = this.dialogCtrl.open(
        SimpleModalComponent,
        {
          data: {
            title,
            message,
            duration
          } as SimpleModalData
        }
      );

      ref.afterClosed().subscribe(() => {
        resolve();
      });
    });
  }

  onBack() {
    this.routerCtrl.navigateByUrl('/cliente/metodo');
  }

  async onRegister() {
    try {
      const resp = await this.clienteServ.registro({
        rut: this.rut.trim(),
        nombres: this.nombres.trim(),
        apellidoP: this.apellidoP.trim(),
        apellidoM: this.apellidoM.trim(),
        fechaNac: this.fechaNac,
        telefono: this.phone.trim(),
        email: this.email.trim()
      });

      await this.voucherServ.printRut(this.rut);
      await this.openDialog(
        'FINALIZADO:',
        'Se ha generado exitosamente su nuevo usuario e impreso su número de atención.',
        2500
      );
      this.onBack();
    } catch (err) {
      await this.openDialog(
        'ERROR:',
        err.details,
        3000
      );
      this.onBack();
    }
  }
}
