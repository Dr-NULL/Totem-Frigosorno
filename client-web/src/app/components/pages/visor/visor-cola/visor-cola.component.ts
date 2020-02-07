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
  data: Voucher[];

  constructor(
    private ventaServ: VentaService,
    private route: ActivatedRoute,
    private io: Socket
) { }

  // Lee parámetros de la URL e inicializa el Socket
  ngOnInit() {
    this.setVoucher([]);
    this.route.paramMap.subscribe((params => {
      // Asignar el parámetro IP
      this.ip = params.get('ip');

      // Conectar Socket
      this.io.disconnect();
      this.io.connect();

      // Conectarse a una Sala
      this.io.emit('join-to-totem', this.ip);
    }).bind(this));

    // Reconectar cuando se desconecte del cliente
    this.io.on(
      'connect_timeout',
      (() => {
        this.io.connect();

        // Conectarse a una Sala
        this.io.emit('join-to-totem', this.ip);
      }).bind(this)
    );

    // Registrar evento del Socket
    this.io.on(
      'correlativo-update',
      (() => {
        this.onLoad();
      }).bind(this)
    );
  }

  // Realiza la Petición HTTP para obtener los correlativos actuales
  async onLoad() {
    try {
      const res = await this.ventaServ.get(this.ip);
      this.setVoucher(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  // Llena los correlativos faltantes
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
