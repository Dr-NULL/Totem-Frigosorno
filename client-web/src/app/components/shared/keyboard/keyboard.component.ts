import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Layout, LayoutBtn, Key } from './keyboard.interfaces';

import { stylizeLayout } from './keyboard.layout';
import { ES_LATIN } from './layouts/es-latin';

export {
  ES_LATIN,
  Layout,
  Key
};

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  private static activeInput: HTMLInputElement;

  @ViewChild('input', { static: false })
  private rawInput: ElementRef<HTMLInputElement>;
  private get input(): HTMLInputElement {
    if (this.rawInput != null) {
      return this.rawInput.nativeElement;
    } else {
      return null;
    }
  }

  @Input()
  layout: Layout;

  @Input()
  placeholder: string;

  @Input()
  get value(): string {
    if (this.input != null) {
      this.rawValue = this.input.value;
    }
    return this.rawValue;
  }
  set value(v: string) {
    this.rawValue = v;
    if (this.input != null) {
      this.input.value = v;
    }
    this.valueChange.emit(v);
    this.update.emit(this);
  }

  @Output()
  valueChange = new EventEmitter<string>();

  @Output()
  update = new EventEmitter<KeyboardComponent>();

  @Output()
  pressEnter = new EventEmitter<KeyboardComponent>();

  @Output()
  pressEsc = new EventEmitter<KeyboardComponent>();

  private rawValue: string;
  private rawLayout: LayoutBtn;
  private pos = { m: 0, n: 0 };
  private mode = {
    default: false,
    caps: false,
    shift: false,
    altGr: false
  };

  @ViewChild('keyboard', { static: true })
  ref: ElementRef<HTMLElement>;

  private get self(): HTMLElement {
    return this.ref.nativeElement;
  }

  constructor(
    private render: Renderer2
  ) {}

  ngOnInit() {
    // Instanciar Layout
    if (this.layout == null) {
      this.layout = ES_LATIN;
    }
    this._hide();
    this.rawLayout = stylizeLayout(this.layout);
    this.modeDefault();
  }

  ngAfterViewInit() {
    // Eventos Input
    this.input.onclick = () => this._getPosition();
    this.input.onkeyup = () => this._getPosition();
    this.input.onchange = () => this._getPosition();
    this.input.onfocus = ev => {
      setTimeout(() => {
        KeyboardComponent.activeInput = ev.target as HTMLInputElement;
        this._getPosition();
        this.show();

      }, 250);
    };
    document.onmouseup = ev => {
      const all = this._getKeyboards();
      const keys = this._getKeyboard(
        ev.target as Node
      );

      if (keys === null) {
        for (const key of all) {
          this._hide(key);
        }
      }
    };
    this.input.onblur = () => {
      setTimeout(() => {
        const all = this._getKeyboards();
        const host = this._getKeyboard(
          document.activeElement
        );

        if (
          (host !== null) &&
          (!KeyboardComponent.activeInput
            .isSameNode(document.activeElement))
        ) {
          if (!this._getKeyboard(
            KeyboardComponent.activeInput
          ).contains(
            document.activeElement
          )) {
            for (const key of all) {
              this._hide(key);
            }
          }
        }
      }, 250);
    };
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

  show() {
    this.render.removeClass(this.self, 'hidden');
    this.render.addClass(this.self, 'show');
  }

  hide() {
    this.render.removeClass(this.self, 'show');
    this.render.addClass(this.self, 'hidden');
    this.input.blur();
  }

  private _hide(ref: Node = this.self) {
    this.render.removeClass(ref, 'show');
    this.render.addClass(ref, 'hidden');
  }

  private _getKeyboards() {
    const out: Node[] = [];
    document
      .querySelectorAll(this.self.parentNode.nodeName)
      .forEach(item => {
        item.childNodes.forEach(child => {
          if ((child as HTMLElement).classList.contains('keyboard')) {
            out.push(child as Node);
          }
        });
      });

    return out;
  }

  private _getKeyboard(elem: Node) {
    let current = elem;
    while (current != null) {
      if (current.nodeName.toLowerCase() === this.self.parentNode.nodeName.toLowerCase()) {
        const children = current.childNodes;
        current = null;
        children.forEach(item => {
          if ((item as HTMLElement).classList.contains('keyboard')) {
            current = item;
          }
        });

        break;
      } else {
        current = current.parentNode;
      }
    }

    return current;
  }

  private _onClick(key: string) {
    switch (key) {
      case '{enter}':
        this.pressEnter.emit(this);
        break;
      case '{esc}':
        this.pressEsc.emit(this);
        break;
      case '{space}':
        this._write(' ');
        break;
      case '{back}':
        this._backspace();
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
        this._write(key);
        break;
    }
  }

  private _write(key: string) {
    // Escribir
    const v = this.input.value;
    let out = v.substr(0, this.pos.m);
    out += key;
    out += v.substr(this.pos.n);

    this.pos.m++;
    this.pos.n = this.pos.m;

    this.value = out;
    this.input.focus();

    this.update.emit();
    this._setPosition();

    // Volver a Default
    if (
      this.mode.shift ||
      this.mode.altGr
    ) {
      this.modeDefault();
    }
  }

  private _backspace() {
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

    this.value = out;
    this._setPosition();
  }

  private _onChange() {
    this.input.focus();
    this.valueChange.emit(this.value);
    this.update.emit(this);
  }

  private _getPosition() {
    const start = this.input.selectionStart;
    const end = this.input.selectionEnd;

    this.pos.m = start;
    this.pos.n = end;
    this.update.emit(this);
  }

  private _setPosition() {
    this.input.selectionStart = this.pos.m;
    this.input.selectionEnd = this.pos.n;
  }
}
