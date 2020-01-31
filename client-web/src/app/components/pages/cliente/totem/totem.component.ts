import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VoucherService } from '../../../../services/voucher/voucher.service';
import { ModalBasicComponent, ModalBasicData } from 'src/app/components/shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-metodo',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.scss']
})
export class TotemComponent implements OnInit {

  constructor(
    private voucherServ: VoucherService,
    private dialogCtrl: MatDialog
  ) { }

  ngOnInit() {
  }

  async onPrint() {
    try {
      await this.voucherServ.print();
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
}
