import { Component, OnInit } from '@angular/core';
import { TotemService, Totem } from 'src/app/services/totem/totem.service';

@Component({
  selector: 'app-select-totem',
  templateUrl: './select-totem.component.html',
  styleUrls: ['./select-totem.component.scss']
})
export class SelectTotemComponent implements OnInit {
  data: Totem[] = [];

  constructor(
    private totemServ: TotemService
  ) { }

  async ngOnInit() {
    const res = await this.totemServ.todos();
    this.data = res.data;
  }
}
