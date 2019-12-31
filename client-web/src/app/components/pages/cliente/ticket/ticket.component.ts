import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';
import { HtmlElem } from '../../../../decorators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
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
    this.value = this.rutServ.format(this.value);

    if (this.rutServ.isValid(this.value)) {
      this.onPrintRut();
    }
  }

  onPrint() {
    console.clear();
    console.log('IMPRIMIR VOUCHER!!!! /(°-°)7');

    this.value = '';
    this.routerCtrl.navigate(['cliente/metodo']);
  }

  onPrintRut() {
    console.clear();
    console.log(`IMPRIMIR VOUCHER PARA ${this.value}!!!! /(°-°)7`);

    this.value = '';
    this.routerCtrl.navigate(['cliente/metodo']);
  }
}
