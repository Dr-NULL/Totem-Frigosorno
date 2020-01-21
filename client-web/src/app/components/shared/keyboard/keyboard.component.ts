import { Component, Input, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Layout, LayoutBtn } from './keyboard.interfaces';

import { ES_LATIN } from './layouts/es-latin';
import { stylizeLayout } from './keyboard.layout';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  static activeInput: HTMLInputElement;

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
    private ref: ElementRef<HTMLElement>,
    private render: Renderer2
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
    this.input.onfocus = ev => {
      setTimeout(() => {
        KeyboardComponent.activeInput = ev.target as HTMLInputElement;
        this.getPosition();
        this.show();
      }, 250);
    };
    document.onmouseup = ev => {
      const all = this.getKeyboards();
      const formField = this.getFormField(
        ev.target as Node
      );

      if (formField === null) {
        for (const key of all) {
          this.hide(key);
        }
      }
    };
    this.input.onblur = () => {
      setTimeout(() => {
        const all = this.getKeyboards();
        const formField = this.getFormField(
          document.activeElement
        );

        if (
          (formField !== null) &&
          (!KeyboardComponent.activeInput
            .isSameNode(document.activeElement))
        ) {
          if (!this.getFormField(
            KeyboardComponent.activeInput
          ).contains(
            document.activeElement
          )) {
            for (const key of all) {
              this.hide(key);
            }
          }
        }
      }, 250);
    };
  }

  getKeyboards() {
    const out: Node[] = [];
    const all = document
      .querySelectorAll(this.self.nodeName)
      .forEach(item => out.push(item));

    return out;
  }

  getFormField(elem: Node) {
    let current = elem;
    while (current != null) {
      if (current.nodeName.toLowerCase() === 'mat-form-field') {
        return current;
      } else {
        current = current.parentNode;
      }
    }

    return current;
  }

  show() {
    this.isFocused = true;
    this.render.removeClass(this.self, 'hidden');
    this.render.addClass(this.self, 'show');
  }

  hide(ref: Node = this.self) {
    this.isFocused = false;
    this.render.removeClass(ref, 'show');
    this.render.addClass(ref, 'hidden');
  }

  modeDefault() {
    this.mode.default = true;
    this.mode.caps = false;
    this.mode.shift = false;
    this.mode.altGr = false;

    this.render.addClass(this.self, 'default');
    this.render.removeClass(this.self, 'shift');
    this.render.removeClass(this.self, 'altgr');
  }

  modeCaps() {
    this.mode.default = false;
    this.mode.caps = true;
    this.mode.shift = false;
    this.mode.altGr = false;

    this.render.removeClass(this.self, 'default');
    this.render.addClass(this.self, 'shift');
    this.render.removeClass(this.self, 'altgr');
  }

  modeShift() {
    this.mode.default = false;
    this.mode.caps = false;
    this.mode.shift = true;
    this.mode.altGr = false;

    this.render.removeClass(this.self, 'default');
    this.render.addClass(this.self, 'shift');
    this.render.removeClass(this.self, 'altgr');
  }

  modeAltGr() {
    this.mode.default = false;
    this.mode.caps = false;
    this.mode.shift = false;
    this.mode.altGr = true;

    this.render.removeClass(this.self, 'default');
    this.render.removeClass(this.self, 'shift');
    this.render.addClass(this.self, 'altgr');
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
    let out = v.substr(0, this.pos.m);
    out += key;
    out += v.substr(this.pos.n);

    this.pos.m++;
    this.pos.n = this.pos.m;
    this.input.value = out;
    this.setPosition();

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
    let out = '';

    if (
      (this.pos.m > 0) &&
      (this.pos.m === this.pos.n)
    ) {
      out = v.substr(0, this.pos.m - 1);
      out += v.substr(this.pos.m);

      this.pos.m--;
      this.pos.n--;
    } else {
      out = v.substr(0, this.pos.m);
      out += v.substr(this.pos.n);

      this.pos.n = this.pos.m;
    }

    this.input.value = out;
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
