import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { RutService } from 'src/app/services/rut/rut.service';
import { VoucherService } from 'src/app/services/voucher/voucher.service';
import { FormatterService } from 'src/app/services/formatter/formatter.service';
import { ClienteService, Cliente } from 'src/app/services/cliente/cliente.service';
import { ApiError } from 'src/app/interfaces/api';

import { ModalBasicComponent, ModalBasicData } from 'src/app/components/shared/modal-basic/modal-basic.component';
import { ModalCustomComponent, ModalCustomData } from 'src/app/components/shared/modal-custom/modal-custom.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HtmlCollection } from '../../../../tool/.';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  enabled = false;
  editing = false;
  maxDate = moment()
    .add(-1, 'days')
    .toDate();

  id: number;
  rut = '';
  rutIsValid = false;
  nombres = '';
  apellidoP = '';
  apellidoM = '';
  fechaNac = new Date();
  phone = '';
  phoneIsValid = true;
  email = '';
  emailIsValid = true;

  constructor(
    private rutServ: RutService,
    private routerCtrl: Router,
    private dialogCtrl: MatDialog,
    private formatServ: FormatterService,
    private voucherServ: VoucherService,
    private clienteServ: ClienteService
  ) { }

  ngOnInit() {
    this.enabled = false;
    this.editing = false;
    // this.maxDate = moment()
    //   .add(-1, 'days')
    //   .toDate();

    this.id = null;
    this.rut = '';
    this.rutIsValid = false;
    this.nombres = '';
    this.apellidoP = '';
    this.apellidoM = '';
    this.fechaNac = new Date();
    this.phone = '';
    this.phoneIsValid = false;
    this.email = '';
    this.emailIsValid = false;
  }

  // Formatear RUT mientras se escribe
  onKeyUpRut() {
    this.rut = this.rutServ.format(this.rut);
    this.onBlurAll();
  }

  // Validar RUT
  async onBlurRut(ev: KeyboardEvent) {
    const num = this.rut
      .replace(/[^0-9]/gi, '')
      .match(/^[0-9]+$/gi);

    if (num == null) {
      this.rutIsValid = false;
    } else if (parseInt(num[0], 10) < 1000000) {
      this.rutIsValid = false;
    } else {
      this.rutIsValid = this.rutServ.isValid(this.rut);
    }

    this.onBlurAll();
    if (!this.rutIsValid) {
      this.dialogCtrl.open(
        ModalCustomComponent,
        {
          data: {
            title: 'ERROR!',
            message: 'El RUT que ha ingresado no es válido, por favor verifique '
            + 'que los números ingresados sean los correctos.',
            duration: 4000,
            buttons: [
              {
                icon: 'far fa-thumbs-up',
                text: 'Aceptar',
                color: 'primary',
                dissmiss: true,
                callback: () => {
                  (ev.target as HTMLElement).focus();
                }
              },
              {
                icon: 'fas fa-angle-double-left',
                text: 'Volver',
                color: 'accent',
                dissmiss: true,
                callback: () => {
                  this.onBack();
                }
              }
            ]
          } as ModalCustomData
        }
      );
    } else {
      // Buscar Usuario
      try {
        const resp = await this.clienteServ.buscar(this.rut);
        await this.openDialog(
          'ERROR!',
          'El RUT que ha ingresado ya se encuentra registrado. '
          + 'Utilice la opción "impresión con RUT" en su lugar.',
          4000
        );
        this.onBack();

        // this.dialogCtrl.open(
        //   ModalCustomComponent,
        //   {
        //     data: {
        //       title: 'AVISO:',
        //       message: 'Este rut ya se encuentra registrado.',
        //       buttons: [
        //         {
        //           icon: 'fas fa-thumbs-up',
        //           text: 'Ok',
        //           color: 'accent',
        //           callback: () => {
        //             this.loadData(resp.data);
        //           }
        //         },
        //         {
        //           icon: 'fas fa-times',
        //           text: 'Cancelar',
        //           color: 'primary',
        //           callback: () => {
        //             this.onBack();
        //           }
        //         }
        //       ]
        //     } as ModalCustomData
        //   }
        // );
      } catch (err) {
        if ((err as ApiError).status !== '404') {
          this.openDialog(
            'ERROR:',
            err.details,
            3000
          );
        }
      }
    }
  }

  onFocusPhone(target: HTMLInputElement) {
    if (this.phone.trim() === '') {
      this.phone = '+56 9 ';
      target.selectionStart = this.phone.length - 1;
      target.selectionEnd = target.selectionStart;
      target.value = this.phone;
    }
  }

  onKeyUpPhone(target: HTMLInputElement) {
    const raw = this.phone
      .replace(/\s+/gi, '')
      .replace(/^\+569/gi, '');

    if (raw === '') {
      this.phoneIsValid = true;
      this.phone = '+56 9 ';
      target.value = this.phone;
    } else {
      const input = raw.match(/[0-9]/gi);
      let out = '+56 9 ';

      if (input != null) {
        for (let i = 0; (i < input.length) && (i < 8); i++) {
          switch (i) {
            case 4:
              out += ' ';
              out += input[i];
              break;
            default:
              out += input[i];
          }
        }
      }

      this.phone = out;
      target.value = out;

      if (input.length >= 8) {
        this.phoneIsValid = true;
      } else {
        this.phoneIsValid = false;
      }

      this.onBlurAll();
    }
  }

  async onBlurPhone(ref: HTMLInputElement) {
    const raw = this.phone
      .replace(/\s+/gi, '')
      .replace(/^\+569/gi, '');

    if (raw.length === 0) {
      this.phone = '';
      ref.value = this.phone;

      this.phoneIsValid = true;
      this.onBlurAll();
    } else {
      if (raw.length < 8) {
        this.phoneIsValid = false;
      } else {
        this.phoneIsValid = !isNaN(parseInt(this.phone, 10));
      }

      this.onBlurAll();
      if (!this.phoneIsValid) {
        await this.openDialog(
          'ERROR!',
          'El Número Telefónico que ha ingresado no es válido, por favor verifique '
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
          'El Email que ha ingresado no es válido, por favor verifique '
          + 'que su correo se haya ingresado con el formato correcto '
          + '(ej: ejemplo@proveedor.com). Si no desea colocar '
          + 'su Email puede omitir este campo.',
          3000
        );
        this.email = '';
        this.onBlurAll();
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
      (
        (this.fechaNac != null) &&
        (moment(new Date()).diff(this.fechaNac, 'years') >= 16) &&
        (moment(new Date()).diff(this.fechaNac, 'years') <= 110)
      ) && (
        (this.phoneIsValid) ||
        (this.phone.length === 0)
      ) &&
      (
        (this.emailIsValid) ||
        (this.email.length === 0)
      )
    );
  }

  openDialog(title: string, message: string, duration: number = null) {
    return new Promise(resolve => {
      const lol = this.dialogCtrl.open(
        ModalBasicComponent,
        {
          width: 'calc(100vw - 4rem)',
          data: {
            title,
            message,
            duration,
            callback: () => {
              resolve();
            }
          } as ModalBasicData
        }
      );
    });
  }

  onBack() {
    this.routerCtrl.navigateByUrl('/cliente/totem');
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

      // Consultar si desea imprimir Voucher
      this.dialogCtrl.open(
        ModalCustomComponent,
        {
          data: {
            title: 'Finalizado:',
            message: 'Se ha generado exitosamente su nuevo usuario.',
            duration: 4000,
            callback: () => {
              this.onBack();
            },
            buttons: [
              {
                icon: 'fas fa-print',
                text: 'Imprimir',
                color: 'accent',
                dissmiss: true,
                callback: () => {
                  this.voucherServ.printRut(this.rut);
                  this.onBack();
                }
              },
              {
                icon: 'fas fa-thumbs-up',
                text: 'Ok',
                color: 'primary',
                dissmiss: true,
                callback: () => {
                  this.onBack();
                }
              }
            ]
          } as ModalCustomData
        }
      );
    } catch (err) {
      await this.openDialog(
        'ERROR:',
        err.details,
        3000
      );
      this.ngOnInit();
      this.onBack();
    }
  }

  async onUpdate() {
    try {
      if (this.apellidoM != null) {
        this.apellidoM = this.apellidoM.trim();
      }

      const resp = await this.clienteServ.actualizar({
        id: this.id,
        rut: this.rut.trim(),
        nombres: this.nombres.trim(),
        apellidoP: this.apellidoP.trim(),
        apellidoM: this.apellidoM,
        fechaNac: this.fechaNac,
        telefono: this.phone.trim(),
        email: this.email.trim()
      });

      await this.openDialog(
        'FINALIZADO:',
        'Se han actualizado exitosamente sus datos.',
        3000
      );
    } catch (err) {
      await this.openDialog(
        'ERROR:',
        err.details,
        3000
      );
    } finally {
      this.ngOnInit();
      this.onBack();
    }
  }

  loadData(cli: Cliente) {
    this.editing = true;
    this.id = cli.id;
    this.rut = this.rutServ.format(cli.rut);
    this.rutIsValid = true;
    this.nombres = cli.nombres;
    this.apellidoP = cli.apellidoP;
    this.apellidoM = cli.apellidoM;
    this.fechaNac = cli.fechaNac;

    if (cli.telefono !== null) {
      this.phoneIsValid = true;
      this.phone = cli.telefono;
    } else {
      this.phoneIsValid = true;
      this.phone = '';
    }

    if (cli.email !== null) {
      this.emailIsValid = true;
      this.email = cli.email;
    } else {
      this.emailIsValid = false;
      this.email = '';
    }

    this.onBlurAll();
  }
}
