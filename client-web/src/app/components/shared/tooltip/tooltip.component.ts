import { Component, OnInit, OnDestroy, ViewChild, Input, ElementRef } from '@angular/core';
import { Writter, KeyboardComponent } from '../keyboard/keyboard.component';
import { Html, HtmlCollection } from '../../../tool/.';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input()
  faIcon: string;

  @Input()
  duration: number;

  @Input()
  horAlign: 'left' | 'right' = 'left';

  @Input()
  width: string;

  @ViewChild('handler', { static: true })
  handler: ElementRef<HTMLElement>;

  @ViewChild('content', { static: true })
  content: ElementRef<HTMLElement>;

  private get visible(): boolean {
    return this.content.nativeElement.classList.contains('show');
  }

  constructor(
    private self: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    switch (this.horAlign) {
      case 'left':
        this.content.nativeElement.style.left = '0';
        break;
      case 'right':
        this.content.nativeElement.style.right = '0';
        break;
    }

    if (this.width != null) {
      this.content.nativeElement.style.width = this.width;
    }

    document.addEventListener('click', this.onClickOutside.bind(this), false);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this), false);
  }

  onClick(ev: MouseEvent) {
    let field = new Html(ev.currentTarget as HTMLElement);
    field = field.getAncestor('mat-form-field');

    if (
      (Writter.input != null) &&
      (!field.contains(Writter.input))
    ) {
      const attr = Writter.input.attributes.getNamedItem('keyboard');
      const kbRef = new Html(`app-keyboard[name=${attr.value}]`);

      Writter.input = null;
      if (kbRef != null) {
        const key = new KeyboardComponent(new ElementRef(kbRef.raw as HTMLElement));
        key.anime.hide();
        key.anime.hide();
      }
    }

    if (!this.visible) {
      this.show();
    } else {
      this.hide();
    }

    ev.stopPropagation();
  }

  onClickOutside(ev: MouseEvent) {
    if (!this.visible) {
      return;
    }

    const field = new Html(ev.target as HTMLElement)
      .getAncestor('mat-form-field');

    if (field == null) {
      this.hide();
    } else if (field.contains(this.self.nativeElement)) {
      this.hide();
    }
  }

  show() {
    const tooltips = new HtmlCollection('app-tooltip .content.show');
    tooltips.rawNodes(node => {
      node.classList.remove('show');
      node.classList.add('hide');
    });

    this.content.nativeElement.classList.remove('hide');
    this.content.nativeElement.classList.add('show');

    if (this.duration != null) {
      setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  hide() {
    this.content.nativeElement.classList.remove('show');
    this.content.nativeElement.classList.add('hide');
  }
}
