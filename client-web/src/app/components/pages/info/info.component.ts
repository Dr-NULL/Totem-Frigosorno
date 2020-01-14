import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TotemService, Totem } from '../../../services/totem/totem.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  ip = 'xDDDDDd';
  found = false;
  currCorr: number;
  descripc: string;

  constructor(
    private totemServ: TotemService,
    private snackCtrl: MatSnackBar
  ) { }

  async ngOnInit() {
    try {
      const res = await this.totemServ.info();
      this.ip = res.data.ip;
      if (res.data.id != null) {
        this.descripc = res.data.descripc;
        this.currCorr = res.data.currCorr;
        this.found = true;
      } else {
        this.descripc = '127.0.0.1';
        this.currCorr = -999;
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
