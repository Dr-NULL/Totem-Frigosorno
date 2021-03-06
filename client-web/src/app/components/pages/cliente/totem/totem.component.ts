import { Component, OnInit, ViewChild } from '@angular/core';
import { VoucherService } from '../../../../services/voucher/voucher.service';
import { RutService } from '../../../../services/rut/rut.service';

import { MatDialog, MatTooltip } from '@angular/material';
import { ModalBasicComponent, ModalBasicData } from '../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.scss']
})
export class TotemComponent implements OnInit {
  @ViewChild('tooltip', { static: true })
  tooltip: MatTooltip;

  disabled = true;
  isNull = true;
  rawValue: string;
  get value(): string {
    if (this.isNull) {
      return null;
    } else {
      return this.rawValue;
    }
  }
  set value(v: string) {
    if (v !== null) {
      this.rawValue = v;
      this.isNull = false;
    } else {
      this.rawValue = 'Ingrese su RUT.';
      this.isNull = true;
    }
  }

  constructor(
    private rutServ: RutService,
    private voucherServ: VoucherService,
    private dialogCtrl: MatDialog
  ) { }

  ngOnInit() {
    this.value = null;
  }

  onKeyPress(v: string) {
    if (this.value === null) {
      this.value = '';
    }

    this.value += v;
    this.onValidation();
  }

  onDelete() {
    if (this.value === null) {
      return;
    }

    this.value = this.value.replace(/(\.|-)/gi, '');
    if (this.value.length > 1) {
      this.value = this.value.substr(
        0,
        this.value.length - 1
      );
    } else {
      this.value = null;
    }

    this.onValidation();
  }

  onValidation() {
    if (this.value != null) {
      this.value = this.rutServ.format(this.value);
      const num = this.value
        .replace(/[^0-9]/gi, '')
        .match(/^[0-9]+$/gi);

      if (num == null) {
        this.disabled = true;
      } else if (parseInt(num[0], 10) < 1000000) {
        this.disabled = true;
      } else {
        this.disabled = !this.rutServ.isValid(this.value);
      }
    } else {
      this.disabled = true;
    }
  }

  async onPrint() {
    try {
      await this.voucherServ.printRut(this.rawValue);
      this.dialogCtrl.open(
        ModalBasicComponent,
        {
          width: 'calc(100vw - 4rem)',
          data: {
            title: 'COMPLETADO:',
            message: 'Voucher impreso, por favor retírelo de la ranura inferior y espere su turno.',
            duration: 4000
          } as ModalBasicData
        }
      );

      this.disabled = true;
      this.value = null;
    } catch (err) {
      this.dialogCtrl.open(
        ModalBasicComponent,
        {
          width: 'calc(100vw - 4rem)',
          data: {
            title: 'ERROR:',
            message: err.details,
            duration: 3000
          } as ModalBasicData
        }
      );
    }
  }

  async onPrintNoRut() {
    try {
      await this.voucherServ.printRut('');
      this.dialogCtrl.open(
        ModalBasicComponent,
        {
          width: 'calc(100vw - 4rem)',
          data: {
            title: 'COMPLETADO:',
            message: 'Voucher impreso, por favor retírelo de la ranura inferior y espere su turno.',
            duration: 4000
          } as ModalBasicData
        }
      );

      this.disabled = true;
      this.value = null;
    } catch (err) {
      this.dialogCtrl.open(
        ModalBasicComponent,
        {
          width: 'calc(100vw - 4rem)',
          data: {
            title: 'ERROR:',
            message: err.details,
            duration: 3000
          } as ModalBasicData
        }
      );
    }
  }


  onInfo() {
    this.tooltip.show();

    setTimeout(() => {
      this.tooltip.hide();
    }, 5000);
  }
}
