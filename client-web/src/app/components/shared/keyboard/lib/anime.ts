import { ElementRef } from '@angular/core';

export class Anime {
  private self: HTMLElement;
  get outlet(): HTMLElement {
    return this.queryOne('app-root > .content > *:not(router-outlet)');
  }

  private new = true;
  private defau: HTMLElement;
  private shift: HTMLElement;
  private altgr: HTMLElement;

  constructor(ref: ElementRef<HTMLElement>) {
    this.self = ref.nativeElement;
    this.self.classList.add('default');

    const name = this.self.attributes.getNamedItem('name').value;
    this.defau = this.queryOne(`app-keyboard[name=${name}] > .mode.default`);
    this.shift = this.queryOne(`app-keyboard[name=${name}] > .mode.shift`);
    this.altgr = this.queryOne(`app-keyboard[name=${name}] > .mode.altgr`);
  }

  queryOne(input: string) {
    return document.querySelector(input) as HTMLElement;
  }

  queryAll(input: string) {
    const data: HTMLElement[] = [];
    document.querySelectorAll(input).forEach((item: HTMLElement) => {
      data.push(item);
    });

    return data;
  }

  getChildren() {
    const data: HTMLElement[] = [];
    this.self.childNodes.forEach((item: HTMLElement) => {
      data.push(item);
    });

    return data;
  }

  show() {
    this.outlet.style.cssText = `
      transition-duration: 250ms;
      transition-timing-function: ease-out;
      height: calc(100vh - 3rem - ${this.defau.offsetHeight}px)!important
    `;

    this.self.style.cssText = `
      transition-duration: 250ms;
      box-shadow:  0 0 2rem #151515;
      transition-timing-function: ease-out;
      height: ${this.defau.offsetHeight}px;
      bottom: 0;
    `;
  }

  hide() {
    if (this.new) {
      this.new = false;
      this.self.style.bottom = `-${this.defau.offsetHeight}px`;
    } else {
      this.outlet.style.cssText = `
        transition-duration: 250ms;
        transition-timing-function: ease-out;
        height: calc(100vh - 3rem)!important
      `;

      this.self.style.cssText = `
        transition-duration: 250ms;
        box-shadow:  none;
        transition-timing-function: ease-out;
        height: ${this.defau.offsetHeight}px;
        bottom: -${this.defau.offsetHeight}px;
      `;
    }
  }

  get mode(): 'default' | 'shift' | 'altgr' {
    if (this.self.classList.contains('shift')) {
      this.self.classList.remove('default');
      this.self.classList.remove('altgr');
      this.self.classList.add('shift');
      return 'shift';
    } else if (this.self.classList.contains('altgr')) {
      this.self.classList.remove('default');
      this.self.classList.remove('shift');
      this.self.classList.add('altgr');
      return 'altgr';
    } else {
      this.self.classList.remove('shift');
      this.self.classList.remove('altgr');
      this.self.classList.add('default');
      return 'default';
    }
  }
  set mode(v: 'default' | 'shift' | 'altgr') {
    this.self.classList.remove('default');
    this.self.classList.remove('shift');
    this.self.classList.remove('altgr');
    this.self.classList.add(v);
  }
}
