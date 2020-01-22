import { Component, Input, Output, EventEmitter, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class KeyboardComponent implements OnInit {
  private static activeInput: HTMLInputElement;

  @ViewChild('input', { static: false })
  private rawInput: ElementRef<HTMLInputElement>;
  private get refInput(): HTMLInputElement {
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
    if (this.refInput != null) {
      this.rawValue = this.refInput.value;
      this._getPosition();
    }
    return this.rawValue;
  }
  set value(v: string) {
    this.rawValue = v;
    if (this.refInput != null) {
      this.refInput.value = v;
    }
  }

  @Output()
  valueChange = new EventEmitter<string>();

  @Output()
  focusOut = new EventEmitter<KeyboardComponent>();

  @Output()
  updated = new EventEmitter<KeyboardComponent>();

  @Output()
  pressEnter = new EventEmitter<KeyboardComponent>();

  @Output()
  pressEsc = new EventEmitter<KeyboardComponent>();

  rawLayout: LayoutBtn;
  rawValue = '';
  private isBlur = true;
  private pos = { m: 0, n: 0 };
  private mode = {
    default: false,
    caps: false,
    shift: false,
    altGr: false
  };

  @ViewChild('keyboard', { static: true })
  rawKeyboard: ElementRef<HTMLElement>;

  private get refKeyboard(): HTMLElement {
    return this.rawKeyboard.nativeElement;
  }

  private get refSelf(): HTMLElement {
    return this.rawSelf.nativeElement;
  }

  constructor(
    private rawSelf: ElementRef<HTMLElement>,
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
  }

  modeDefault() {
    this.mode.default = true;
    this.mode.caps = false;
    this.mode.shift = false;
    this.mode.altGr = false;

    this.render.addClass(this.refKeyboard, 'default');
    this.render.removeClass(this.refKeyboard, 'shift');
    this.render.removeClass(this.refKeyboard, 'altgr');
  }

  modeCaps() {
    this.mode.default = false;
    this.mode.caps = true;
    this.mode.shift = false;
    this.mode.altGr = false;

    this.render.removeClass(this.refKeyboard, 'default');
    this.render.addClass(this.refKeyboard, 'shift');
    this.render.removeClass(this.refKeyboard, 'altgr');
  }

  modeShift() {
    this.mode.default = false;
    this.mode.caps = false;
    this.mode.shift = true;
    this.mode.altGr = false;

    this.render.removeClass(this.refKeyboard, 'default');
    this.render.addClass(this.refKeyboard, 'shift');
    this.render.removeClass(this.refKeyboard, 'altgr');
  }

  modeAltGr() {
    this.mode.default = false;
    this.mode.caps = false;
    this.mode.shift = false;
    this.mode.altGr = true;

    this.render.removeClass(this.refKeyboard, 'default');
    this.render.removeClass(this.refKeyboard, 'shift');
    this.render.addClass(this.refKeyboard, 'altgr');
  }

  show() {
    this.render.removeClass(this.refKeyboard, 'hidden');
    this.render.addClass(this.refKeyboard, 'show');
  }

  hide() {
    this.render.removeClass(this.refKeyboard, 'show');
    this.render.addClass(this.refKeyboard, 'hidden');

    if (this.refInput != null) {
      this.refInput.blur();
    }
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
    const v = this.value;
    let out = v.substr(0, this.pos.m);
    out += key;
    out += v.substr(this.pos.n);

    this.pos.m++;
    this.pos.n = this.pos.m;

    this.value = out;
    this._onChange();
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
    const v = this.value;
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
    this._onChange();
    this._setPosition();
  }

  private _getPosition() {
    const start = this.refInput.selectionStart;
    const end = this.refInput.selectionEnd;

    this.pos.m = start;
    this.pos.n = end;
  }

  private _setPosition() {
    this.refInput.selectionStart = this.pos.m;
    this.refInput.selectionEnd = this.pos.n;
  }

  private _onChange() {
    this.refInput.focus();
    this.valueChange.emit(this.value);
    this.updated.emit(this);
  }

  private _onFocus() {
    KeyboardComponent.activeInput = this.rawInput.nativeElement;
    this._getPosition();

    if (this.isBlur) {
      setTimeout(() => {
        this.show();
        this.isBlur = false;
      }, 250);
    }
  }

  private _onBlur(ev: FocusEvent) {
    if (
      (!this.isBlur) &&
      (ev.relatedTarget == null)
    ) {
      return;
    }

    const body = document.querySelector('body') as HTMLElement;
    const target = KeyboardComponent.activeInput as HTMLElement;
    const related = ev.relatedTarget as HTMLElement;

    if (
      (!this.isBlur) &&
      (!target.isSameNode(body)) &&
      (!target.isSameNode(related)) &&
      (!this.refSelf.contains(related))
    ) {
      this.isBlur = true;
      this.hide();
      this.focusOut.emit(this);
    }
  }

  private _onClickOutside(ev: Event) {
    const body = document.querySelector('body') as HTMLElement;
    const target = ev.target as HTMLElement;

    if (
      (!this.isBlur) &&
      (!target.isSameNode(body)) &&
      (!this.refSelf.contains(target))
    ) {
      this.isBlur = true;
      this.hide();
      this.focusOut.emit(this);
    }
  }
}
