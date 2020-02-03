import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';
import { Router } from '@angular/router';
import { VoucherService } from '../../../../services/voucher/voucher.service';

import { MatDialog, MatTooltip } from '@angular/material';
import { ModalBasicComponent, ModalBasicData } from '../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-metodo',
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
      this.rawValue = 'Inserte su RUT aquí...';
      this.isNull = true;
    }
  }

  constructor(
    private rutServ: RutService,
    private voucherServ: VoucherService,
    private dialogCtrl: MatDialog,
    private routerCtrl: Router
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
      this.disabled = !this.rutServ.isValid(this.value);
    } else {
      this.disabled = true;
    }
  }

  async onPrint() {
    try {
      await this.voucherServ.printRut(this.rawValue);
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
