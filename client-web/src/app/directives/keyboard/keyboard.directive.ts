import { Directive, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardComponent, Writter } from '../../components/shared/keyboard/keyboard.component';

interface BlurEvent extends FocusEvent {
  explicitOriginalTarget: HTMLElement;
}

@Directive({
  selector: '[appKeyboard]'
})
export class KeyboardDirective implements OnInit, OnDestroy {
  @Input()
  keyboard = '';

  @Output()
  focusOut = new EventEmitter<FocusEvent>();

  constructor(
    private self: ElementRef<HTMLInputElement>
  ) { }

  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (
      this: HTMLInputElement,
      ev: HTMLElementEventMap[K]
    ) => any
  ) {
    this.self.nativeElement.addEventListener(
      type,
      listener.bind(this),
      false
    );
  }

  removeEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (
      this: HTMLInputElement,
      ev: HTMLElementEventMap[K]
    ) => any
  ) {
    this.self.nativeElement.addEventListener(
      type,
      listener.bind(this),
      {
        capture: false
      }
    );
  }

  ngOnInit() {
    this.addEvent('focus', this.onFocus);
    this.addEvent('blur', this.onFocusOut);
  }

  ngOnDestroy() {
    this.removeEvent('focus', this.onFocus);
    this.removeEvent('blur', this.onFocusOut);
  }

  onFocus(ev: FocusEvent) {
    Writter.input = ev.currentTarget as HTMLInputElement;
    const sele = `app-keyboard[name=${this.keyboard}]`;
    const elem = document.querySelector(sele) as HTMLElement;

    const keyboard = new KeyboardComponent(new ElementRef(elem));
    keyboard.anime.show();
  }

  onFocusOut(ev: BlurEvent) {
    const stat = Writter.input;
    const targ = ev.explicitOriginalTarget as HTMLElement;
    const sele = `app-keyboard[name=${this.keyboard}]`;
    const elem = document.querySelector(sele) as HTMLElement;

    if (
      (!elem.isSameNode(targ)) &&
      (!elem.contains(targ))
    ) {
      this.focusOut.emit(ev);
      Writter.input = null;

      const keyboard = new KeyboardComponent(new ElementRef(elem));
      keyboard.anime.hide();
    }
  }
}
