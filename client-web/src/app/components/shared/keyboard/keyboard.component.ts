import { Component, OnInit, OnDestroy, Input, ElementRef, HostListener } from '@angular/core';
import { Layout, normalize } from './lib/layout';
import { LAYOUT_NUMPAD } from './lib/layouts/numpad';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnDestroy {
  protected rawLayout: Layout;
  get layout(): Layout {
    return this.rawLayout;
  }

  @Input()
  set layout(v: Layout) {
    this.rawLayout = normalize(v);
  }

  get self(): HTMLElement {
    return this.rawSelf.nativeElement;
  }

  @Input()
  name: string;
  inputAll: HTMLInputElement[] = [];
  inputCurrent: HTMLInputElement;

  constructor(
    private rawSelf: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.hide();
    if (this.layout == null) {
      this.layout = LAYOUT_NUMPAD;
    }

    setTimeout(() => {
      this.show();
    }, 2500);

    console.log(`input[keyboard=${this.name}]`);
    const ref = document.querySelectorAll(`input[keyboard=${this.name}]`);
    ref.forEach((node: HTMLInputElement) => {
      node.addEventListener(
        'focusin',
        this.onFocus
      );
      this.inputAll.push(node);
    });
  }

  ngOnDestroy() {
    this.inputAll.forEach(item => {
      item.removeEventListener(
        'focusin',
        this.onFocus
      );
    });
  }

  show() {
    // Manipular Content
    const rawContent = document.querySelector('app-root > .content > *:not(router-outlet)') as HTMLElement;
    if (rawContent != null) {
      rawContent.style.cssText = `
        transition-duration: 250ms;
        transition-timing-function: ease-out;
        height: calc(100vh - 3rem - ${this.self.offsetHeight}px)!important`;
    }

    // Manipular Host
    this.self.classList.remove('hide');
    this.self.classList.add('show');
  }

  hide() {
    // Manipular Content
    const rawContent = document.querySelector('app-root > .content > *:not(router-outlet)') as HTMLElement;
    if (rawContent != null) {
      rawContent.style.cssText = `
        transition-duration: 250ms;
        transition-timing-function: ease-out;
        height: calc(100vh - 3rem) !important;`;
    }

    // Manipular Host
    this.self.classList.remove('show');
    this.self.classList.add('hide');
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(ev: MouseEvent) {
    const target = ev.target as HTMLElement;

    if (
      (!this.self.isSameNode(target)) &&
      (!this.self.contains(target))
    ) {
      this.hide();
    }
  }

  onFocus(ev: FocusEvent) {
    const target = ev.target as HTMLElement;
    if (this.isCurrentInput(target)) {
      this.show();
    }
  }

  isCurrentInput(target: HTMLElement) {
    const name = target
    .attributes
    .getNamedItem('keyboard');

    // Solo en caso de que el elemento clickeado sea un input
    if (
      (name != null) &&
      (target.nodeName === 'INPUT')
    ) {
      if (name.value === this.name) {
        return true;
      }
    }

    // Buscar mat-form-field
    while (target != null) {
      if (
        (target.nodeName === 'MAT-FORM-FIELD') &&
        (target.querySelector(`input[name=${this.name}]`) != null)
      ) {
        return true;
      } else {
        target = target.parentElement;
      }
    }

    return false;
  }

  onKeyPress(value: string) {
    console.log(`Valor Presionado -> "${value}"`);
  }
}
