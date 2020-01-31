import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../../services/voucher/voucher.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-metodo',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.scss']
})
export class TotemComponent implements OnInit {

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
      this.snackCtrl.open(err.details, 'Aceptar', { duration: 2500 });
    }
  }
}
