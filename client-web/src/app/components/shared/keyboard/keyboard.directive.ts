import { Directive, Input, OnInit, OnDestroy, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { StaticRef } from './lib/static-ref';

@Directive({
  selector: '[appKeyboard]'
})
export class KeyboardDirective implements OnInit, OnDestroy {

  @Input('appKeyboard')
  name: string;

  constructor(
    private htmlSelf: ElementRef<HTMLInputElement>,
    private render: Renderer2
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  @HostListener('focus', [ '$event' ])
  onKeyUp(ev: KeyboardEvent) {
    StaticRef.currentInput = this.htmlSelf;

    if (StaticRef.keyboards[this.name] !== null) {
      StaticRef.keyboards[this.name].anime.show();
    }
  }

  @HostListener('blur', [ '$event' ])
  onBlur(ev: FocusEvent) {
    StaticRef.currentInput = null;
    if (StaticRef.keyboards[this.name] != null) {
      StaticRef.keyboards[this.name].anime.hide();
    }
  }
}
