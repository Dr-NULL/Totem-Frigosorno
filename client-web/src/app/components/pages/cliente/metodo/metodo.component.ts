import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../../services/voucher/voucher.service';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrls: ['./metodo.component.scss']
})
export class MetodoComponent implements OnInit {

  constructor(
    private voucherServ: VoucherService
  ) { }

  ngOnInit() {
  }

  async onPrint() {
    console.log(await this.voucherServ.print());
  }
}
