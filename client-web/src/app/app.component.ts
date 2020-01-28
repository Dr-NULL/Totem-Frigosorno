import { Component } from '@angular/core';
import { fadeAnimation } from './tool/router-animation';
import { LAYOUT_RUT, LAYOUT_NUMPAD, LAYOUT_ES_LATIN } from './components/shared/keyboard/lib/layouts/.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'client-web';
  layoutRut = LAYOUT_RUT;
  layoutNum = LAYOUT_NUMPAD;
  layoutText = LAYOUT_ES_LATIN;
}
