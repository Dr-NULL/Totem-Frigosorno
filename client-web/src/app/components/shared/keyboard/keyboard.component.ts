import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { Layout, normalize } from './lib/layout';
import { LAYOUT_NUMPAD } from './lib/layouts/numpad';
import { Writter } from './lib/writter';
import { Anime } from './lib/anime';
import SYS, { SHIFT } from './lib/system-keys';

export { Writter };

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  // Propiedad que almacena la plantilla a usar
  protected rawLayout: Layout;
  get layout(): Layout {
    return this.rawLayout;
  }
  @Input()
  set layout(v: Layout) {
    this.rawLayout = normalize(v);
  }

  // Otras variables internas
  @Input()
  name: string;

  @Output()
  callback = new EventEmitter<string>();

  hold = false;
  anime: Anime;
  writter: Writter;

  constructor(
    private rawSelf: ElementRef<HTMLElement>
  ) {
    this.anime = new Anime(this.rawSelf);
    this.writter = new Writter();
  }

  ngOnInit() {
    if (this.layout == null) {
      this.layout = LAYOUT_NUMPAD;
    }
  }

  ngAfterViewInit() {
    this.anime = new Anime(this.rawSelf);
    this.anime.hide();
  }

  @HostListener('document:click', ['$event'])
  onMouseUp(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    const self = this.rawSelf.nativeElement;

    // ev.stopImmediatePropagation();
    if (Writter.input == null) {
      this.anime.hide();
    } else {
      const shared = Writter.input;
      const attr = shared.attributes.getNamedItem('keyboard');

      if (
        (this.name === attr.value) &&
        (!target.isSameNode(shared)) &&
        (!target.contains(shared)) &&
        (!self.isSameNode(target)) &&
        (!self.contains(target))
      ) {
        this.anime.hide();
        shared.blur();
      }
    }

    return false;
  }

  // Usar para forzar la actualización del value en la view correspondiente
  triggerKeyUp(key: string) {
    const input = Writter.input;
    const event = new KeyboardEvent(
      'keyup',
      {
        bubbles: false,
        cancelable: true,
        composed: false,
        key,
        shiftKey: false,
        ctrlKey: false,
        altKey: false,
        metaKey: false
      }
    );
    const target = new EventTarget();
    input.dispatchEvent(event);
  }

  onKeyPress(key: string) {
    const input = Writter.input;
    switch (key) {
      case SYS.BACK.value:
        this.writter.delete();
        break;

      case SYS.ENTER.value:
        this.callback.emit(input.value);
        break;

      case SYS.SHIFT.value:
        this.hold = false;
        if (this.anime.mode !== 'shift') {
          this.anime.mode = 'shift';
        } else {
          this.anime.mode = 'default';
        }
        break;

      case SYS.CAPS.value:
        this.hold = !this.hold;
        if (this.anime.mode !== 'shift') {
          this.anime.mode = 'shift';
        } else {
          this.anime.mode = 'default';
        }
        break;

      case SYS.ALTGR.value:
        this.hold = false;
        if (this.anime.mode !== 'altgr') {
          this.anime.mode = 'altgr';
        } else {
          this.anime.mode = 'default';
        }
        break;

      case SYS.LEFT.value:
        this.writter.moveLeft();
        break;

      case SYS.RIGHT.value:
        this.writter.moveRight();
        break;

      default:
        this.writter.write(key);
        if (!this.hold) {
          this.anime.mode = 'default';
        }

        setTimeout(() => {
          Writter.input.focus();
        }, 50);
        break;
    }

    this.triggerKeyUp(key);
  }
}
