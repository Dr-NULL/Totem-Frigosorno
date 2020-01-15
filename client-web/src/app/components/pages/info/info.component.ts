import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TotemService } from '../../../services/totem/totem.service';
import * as moment from 'moment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  ip = '---.---.---';
  found = true;
  currCorr = ' ';
  descripc = ' ';
  fecha = ' ';
  printerIp = '---.---.---';
  printerName = ' ';

  constructor(
    private totemServ: TotemService,
    private snackCtrl: MatSnackBar
  ) { }

  async ngOnInit() {
    try {
      const res = await this.totemServ.info();
      this.ip = res.data.ip;

      if (res.data.id != null) {
        // Encontrado
        this.descripc = res.data.descripc;
        this.currCorr = String(res.data.currCorr);
        this.fecha = moment(res.data.currFecha).format('DD/MM/YYYY');
        this.printerIp = res.data.printerIp;
        this.printerName = res.data.printerName;

        this.found = true;
      } else {
        // No encontrado
        this.descripc = '---.---.---';
        this.currCorr = ' ';
        this.fecha = '--/--/----';
        this.printerIp = '---.---.---';
        this.printerName = ' ';

        this.found = false;
      }
    } catch (err) {
      this.snackCtrl.open(
        err[0].details,
        'Aceptar',
        { duration: 2500 }
      );
    }
  }
}
