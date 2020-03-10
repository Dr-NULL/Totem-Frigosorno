import { Renderer2, ElementRef } from '@angular/core';

export type Mode = 'default' | 'shift' | 'altgr';

export class Anime {
  private render: Renderer2;
  private element: HTMLElement;
  public hold = false;

  private modeValue: Mode;
  public get mode(): Mode {
    return this.modeValue;
  }
  public set mode(v: Mode) {
    this.modeValue = v;
    const len = this.element.children.length;
    for (let i = 0; i < len; i++) {
      const node = this.element.children.item(i);
      if (node.getAttribute('data-mode') === v) {
        this.render.addClass(node, 'show');
      } else {
        this.render.removeClass(node, 'show');
      }
    }
  }

  constructor(render: Renderer2, element: ElementRef<HTMLElement>) {
    this.render = render;
    this.element = element.nativeElement;
    this.modeValue = 'default';

    this.hide();
  }

  show() {
    const node: HTMLElement = this.element.querySelector('.template.show');
    const height = node.offsetHeight;

    this.render.setStyle(this.element, 'opacity', '1');
    this.render.setStyle(this.element, 'height', `${height}px`);
    this.render.setStyle(this.element, 'transition-duration', '250ms');
    this.render.setStyle(this.element, 'transition-timing-function', 'ease-out');
  }

  hide() {
    this.render.setStyle(this.element, 'opacity', '0');
    this.render.setStyle(this.element, 'height', `0`);
    this.render.setStyle(this.element, 'transition-duration', '250ms');
    this.render.setStyle(this.element, 'transition-timing-function', 'ease-in');
  }

}
