import { Component, OnInit, AfterViewInit, Input, ElementRef, HostListener } from '@angular/core';
import { Layout, normalize } from './lib/layout';
import { LAYOUT_NUMPAD } from './lib/layouts/numpad';
import SYS from './lib/system-keys';
import { Anime } from './lib/anime';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  // Variable estática que almacena el Input actual
  private static rawInput: HTMLInputElement;
  public static get input(): HTMLInputElement {
    return this.rawInput;
  }
  public static set input(v: HTMLInputElement) {
    this.rawInput = v;
  }

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
  hold = false;
  anime: Anime;

  constructor(
    private rawSelf: ElementRef<HTMLElement>
  ) {
    this.anime = new Anime(this.rawSelf);
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

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    const self = this.rawSelf.nativeElement;

    // ev.stopImmediatePropagation();
    if (KeyboardComponent.input == null) {
      this.anime.hide();
    } else {
      const shared = KeyboardComponent.input;
      const attr = shared.attributes.getNamedItem('keyboard');

      if (
        (this.name === attr.value) &&
        (!target.isSameNode(shared)) &&
        (!self.isSameNode(target)) &&
        (!self.contains(target))
      ) {
        this.anime.hide();
        shared.blur();
      } else {
        console.clear();
        console.log(ev);
      }
    }

    return false;
  }

  // Usar para forzar la actualización del value en la view correspondiente
  triggerKeyUp(key: string) {
    const input = KeyboardComponent.input;
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
    switch (key) {
      case SYS.BACK.value:
        this.delete();
        break;

      default:
        this.write(key);
        break;
    }

    const input = KeyboardComponent.input;
    this.triggerKeyUp(key);
  }

  write(key: string) {
    const input = KeyboardComponent.input;
    input.focus();

    let p1 = input.selectionStart;
    let p2 = input.selectionEnd;

    let value =  input.value.substr(0, p1);
    value += key;
    value += input.value.substr(p2);

    p1++;
    p2 = p1;
    input.value = value;
    input.selectionStart = p1;
    input.selectionEnd = p2;
  }

  delete() {
    const input = KeyboardComponent.input;
    let p1 = input.selectionStart;
    let p2 = input.selectionEnd;

    if (
      (p1 > 0) &&
      (p1 === p2)
    ) {
      p1--;
    }

    let value = input.value.substr(0, p1);
    value += input.value.substr(p2);
    input.value = value;

    p2 = p1;
    input.selectionStart = p1;
    input.selectionEnd = p2;
  }
}
