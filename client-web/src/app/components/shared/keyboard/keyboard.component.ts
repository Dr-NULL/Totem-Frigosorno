import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Layout, LayoutBtn } from './keyboard.interfaces';

import { ES_LATIN } from './layouts/es-latin';
import { stylizeLayout } from './keyboard.layout';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Input()
  input: HTMLInputElement;

  @Input()
  layout: Layout;
  rawLayout: LayoutBtn;
  isFocused = false;
  pos = { m: 0, n: 0 };
  mode = {
    default: false,
    caps: false,
    shift: false,
    altGr: false
  };

  get self(): HTMLElement {
    return this.ref.nativeElement;
  }

  constructor(
    private ref: ElementRef
  ) {}

  ngOnInit() {
    // Instanciar Layout
    if (this.layout == null) {
      this.layout = ES_LATIN;
    }
    this.hide();
    this.rawLayout = stylizeLayout(this.layout);
    this.modeDefault();

    // Eventos Input
    this.input.onclick = () => this.getPosition();
    this.input.onkeyup = () => this.getPosition();
    this.input.onchange = () => this.getPosition();
    this.input.onfocus = () => {
      this.isFocused = true;
      setTimeout(() => {
        if (this.isFocused) {
          this.show();
        }
      }, 250);
    };
    this.input.onblur = () => {
      this.isFocused = false;
      setTimeout(() => {
        if (!this.isFocused) {
          this.hide();
        }
      }, 250);
    };
  }

  show() {
    this.self.classList.remove('hidden');
    this.self.classList.add('show');
  }

  hide() {
    this.self.classList.remove('show');
    this.self.classList.add('hidden');
  }

  modeDefault() {
    this.mode.default = true;
    this.mode.caps = false;
    this.mode.shift = false;
    this.mode.altGr = false;

    this.self.classList.add('default');
    this.self.classList.remove('shift');
    this.self.classList.remove('altgr');
  }

  modeCaps() {
    this.mode.default = false;
    this.mode.caps = true;
    this.mode.shift = false;
    this.mode.altGr = false;

    this.self.classList.remove('default');
    this.self.classList.add('shift');
    this.self.classList.remove('altgr');
  }

  modeShift() {
    this.mode.default = false;
    this.mode.caps = false;
    this.mode.shift = true;
    this.mode.altGr = false;

    this.self.classList.remove('default');
    this.self.classList.add('shift');
    this.self.classList.remove('altgr');
  }

  modeAltGr() {
    this.mode.default = false;
    this.mode.caps = false;
    this.mode.shift = false;
    this.mode.altGr = true;

    this.self.classList.remove('default');
    this.self.classList.remove('shift');
    this.self.classList.add('altgr');
  }

  onClick(key: string) {
    switch (key) {
      case '{space}':
        this.write(' ');
        break;
      case '{back}':
        this.backspace();
        break;
      case '{caps}':
        if (this.mode.default) {
          this.modeCaps();
        } else {
          this.modeDefault();
        }
        break;
      case '{shift}':
        if (this.mode.default) {
          this.modeShift();
        } else {
          this.modeDefault();
        }
        break;
      case '{altgr}':
        if (this.mode.default) {
          this.modeAltGr();
        } else {
          this.modeDefault();
        }
        break;
      case undefined:
        break;
      default:
        this.write(key);
        break;
    }
  }

  write(key: string) {
    // Escribir
    const v = this.input.value;


    // Volver a Default
    if (
      this.mode.shift ||
      this.mode.altGr
    ) {
      this.modeDefault();
    }
  }

  backspace() {
    const v = this.input.value;

    if (
      (this.pos.m > 0) &&
      (this.pos.m === this.pos.n)
    ) {
      this.input.value = v.substr(0, this.pos.m - 1);
      this.input.value += v.substr(this.pos.m);

      this.pos.m--;
      this.pos.n--;
    } else {
      this.input.value = v.substr(0, this.pos.m);
      this.input.value += v.substr(this.pos.n);

      this.pos.n = this.pos.m;
    }

    this.setPosition();
  }

  getPosition() {
    const start = this.input.selectionStart;
    const end = this.input.selectionEnd;

    this.pos.m = start;
    this.pos.n = end;
  }

  setPosition() {
    this.input.selectionStart = this.pos.m;
    this.input.selectionEnd = this.pos.n;
  }
}
