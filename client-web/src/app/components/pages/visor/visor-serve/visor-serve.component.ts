import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VentaService, Venta } from 'src/app/services/venta/venta.service';
import { Socket } from 'ngx-socket-io';

interface Voucher {
  id: number;
  corr: string;
  tipo: string;
  nombre: string;
}

@Component({
  selector: 'app-visor-serve',
  templateUrl: './visor-serve.component.html',
  styleUrls: ['./visor-serve.component.scss']
})
export class VisorServeComponent implements OnInit {
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
      const nombre = venta
        .cliente
        .nombres
        .split(/\s+/gi)[0];

      tmp.push({
        id: venta.id,
        tipo: venta.tipoAte.cod,
        corr: venta.correlat.toString(),
        nombre: nombre + ' ' + venta.cliente.apellidoP
      });
    }

    while (tmp.length < 3) {
      tmp.push({
        id: 0,
        corr: '--',
        tipo: '-',
        nombre: '-----'
      });
    }

    this.data = tmp;
  }

  async onServe() {
    try {
      await this.ventaServ.serve(this.ip);
    } catch (err) {
      console.log(err);
    }
  }
}
