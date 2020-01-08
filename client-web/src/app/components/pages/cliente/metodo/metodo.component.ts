import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../../services/voucher/voucher.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrls: ['./metodo.component.scss']
})
export class MetodoComponent implements OnInit {

  constructor(
    private voucherServ: VoucherService,
    private snackCtrl: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async onPrint() {
    try {
      await this.voucherServ.print();
    } catch (err) {
      this.snackCtrl.open(err[0].details, 'Aceptar', { duration: 2500 });
    }
  }
}
