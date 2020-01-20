import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { RutService } from '../../../../services/rut/rut.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  dateMax = new Date();

  data = {
    rut: '',
    nombres: '',
    apellidoP: '',
    apellidoM: '',
    fechaNacim: ''
  };

  constructor(
    private rutServ: RutService
  ) { }
}
