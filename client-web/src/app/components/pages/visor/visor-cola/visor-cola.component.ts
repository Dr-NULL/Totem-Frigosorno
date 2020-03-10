import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Log } from 'src/app/tool/log';

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
  private socketTimer: any;

  constructor(
    private ventaServ: VentaService,
    private route: ActivatedRoute,
    private io: Socket
) { }

  // Lee parámetros de la URL e inicializa el Socket
  ngOnInit() {
    this.drawElem([]);
    this.route.paramMap.subscribe((params => {
      // Asignar el parámetro IP
      this.ip = params.get('ip');

      // Conectar Socket
      this.io.connect();
    }).bind(this));

    // Registrar evento del Socket
    this.io.on(
      'connect',
      this.socketConnect.bind(this)
    );

    this.io.on(
      'error',
      this.socketError.bind(this)
    );

    this.io.on(
      'correlativo-update',
      this.onLoad.bind(this)
    );
  }

  // Realiza la Petición HTTP para obtener los correlativos actuales
  async onLoad() {
    try {
      const res = await this.ventaServ.get(this.ip);
      this.drawElem(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  // Llena los correlativos faltantes
  drawElem(data: Venta[]) {
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

  socketConnect() {
    Log.ok('Socket.IO Conectado!');

    if (this.socketTimer != null) {
      clearInterval(this.socketTimer);
      this.socketTimer = null;
    }

    this.io.emit('join-to-totem', this.ip);
  }

  socketError() {
    Log.ev('Socket.IO Desconectado.');
    Log.ln('Reconectando...');

    this.socketTimer = setInterval(() => {
      this.io.connect();
    }, 250);
  }
}
