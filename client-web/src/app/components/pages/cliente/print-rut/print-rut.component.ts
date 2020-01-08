import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';
import { HtmlElem } from '../../../../decorators';
import { Router } from '@angular/router';
import { VoucherService } from '../../../../services/voucher/voucher.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-print-rut',
  templateUrl: './print-rut.component.html',
  styleUrls: ['./print-rut.component.scss']
})
export class PrintRutComponent implements OnInit {
  @HtmlElem()
  rawBtnPrint: HTMLButtonElement;

  @HtmlElem()
  rawInput: HTMLInputElement;
  rawValue: string;

  @Input()
  get value(): string {
    return this.rawValue;
  }
  set value(v: string) {
    if (v !== null) {
      if (this.rawValue === null) {
        this.rawInput.value = '';
      }

      this.rawInput.value = v;
    } else {
      this.rawInput.value = 'Inserte su RUT aquí...';
    }

    this.rawValue = v;
  }

  @Output()
  valueChange = new EventEmitter<string>();

  constructor(
    private rutServ: RutService,
    private voucherServ: VoucherService,
    private snackCtrl: MatSnackBar,
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
      this.rawBtnPrint.disabled = !this.rutServ.isValid(this.value);
    } else {
      this.rawBtnPrint.disabled = true;
    }
  }

  async onPrint() {
    try {
      await this.voucherServ.printRut(this.rawValue);
    } catch (err) {
      this.snackCtrl.open(err[0].details, 'Aceptar', { duration: 2500 });
    } finally {
      this.routerCtrl.navigate(['cliente/metodo']);
    }
  }
}
