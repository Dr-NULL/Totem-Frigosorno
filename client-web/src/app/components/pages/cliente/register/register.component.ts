import { Component, OnInit } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private rutServ: RutService
  ) { }

  ngOnInit() {
  }

}
