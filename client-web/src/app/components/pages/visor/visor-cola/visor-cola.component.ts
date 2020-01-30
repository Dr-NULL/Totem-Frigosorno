import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { VentaService, Venta } from 'src/app/services/venta/venta.service';
interface Voucher {
  id: number;
  corr: string;
  tipo: string;
}

@Component({
  selector: 'app-visor-cola',
  templateUrl: './visor-cola.component.html',
  styleUrls: ['./visor-cola.component.scss']
})
export class VisorColaComponent implements OnInit {
  ip: string;
  data: Voucher[] = [
    {
      id: 0,
      corr: '--',
      tipo: '-'
    },
    {
      id: 0,
      corr: '--',
      tipo: '-'
    },
    {
      id: 0,
      corr: '--',
      tipo: '-'
    }
  ];

  constructor(
    private ventaServ: VentaService,
    private route: ActivatedRoute,
    private io: Socket
) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params => {
      this.ip = params.get('ip');

      // Conectar Socket
      this.io.connect();
    }).bind(this));

    // Registrar Socket
    this.io.on('corr-update', this.onLoad);
    this.io.emit('corr-serve');
  }

  async onLoad() {
    try {
      const res = await this.ventaServ.get(this.ip);
      this.setVoucher(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  setVoucher(data: Venta[]) {
    const tmp: Voucher[] = [];
    for (const venta of data) {
      tmp.push({
        id: venta.id,
        corr: venta.correlat.toString(),
        tipo: venta.tipoAte.cod
      });
    }

    while (tmp.length < 3) {
      tmp.push({
        id: 0,
        corr: '--',
        tipo: '-'
      });
    }

    this.data = tmp;
  }
}
