import { Component, OnInit, OnDestroy, Input, ElementRef, HostListener, Renderer2, EventEmitter, Output } from '@angular/core';
import { Layout, normalize } from './lib/layout';
import { StaticRef } from './lib/static-ref';
import { KeyReader } from './lib/key-reader';
import { Anime } from './lib/anime';
import { Key } from './lib/layout';
import SYS from './lib/system-keys';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnDestroy {
  static htmlCurrentInput: ElementRef<HTMLInputElement>;

  private timerTimeout: any;
  private timerInterval: any;
  public anime: Anime;

  @Output()
  pressEnter = new EventEmitter<void>();
  @Output()
  pressEscape = new EventEmitter<void>();
  @Output()
  pressTab = new EventEmitter<void>();

  @Input()
  name: string;
  layoutValue: Layout = normalize({ name: 'empty', rows: [] });
  public get layout(): Layout {
    return this.layoutValue;
  }
  @Input()
  public set layout(v: Layout) {
    this.layoutValue = normalize(v);
  }

  constructor(
    private htmlSelf: ElementRef<HTMLElement>,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    this.anime = new Anime(this.render, this.htmlSelf);
    if (StaticRef.keyboards[this.name] == null) {
      StaticRef.keyboards[this.name] = this;
    }
  }

  ngOnDestroy(): void {
    if (StaticRef.keyboards[this.name] != null) {
      delete StaticRef.keyboards[this.name];
    }
  }

  @HostListener('mousedown', [ '$event' ])
  onClick(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    const staticInput = StaticRef
      .currentInput
      .nativeElement;

    if (staticInput != null) {
      staticInput.focus();
    }
  }

  onMouseDown(ev: MouseEvent, value: Key) {
    const staticInput = StaticRef
      .currentInput
      .nativeElement;

    switch (value) {
      case SYS.ENTER:
        this.pressEnter.emit();
        break;
      case SYS.ESC:
        this.pressEscape.emit();
        break;
      case SYS.TAB:
        this.pressTab.emit();
        break;
      default:
        KeyReader.readKey(value, this.anime);
        this.timerTimeout = setTimeout(() => {
          this.timerInterval = setInterval(() => {
            KeyReader.readKey(value, this.anime);
          }, 50);
        }, 500);
    }
  }

  onMouseUp() {
    clearTimeout(this.timerTimeout);
    clearInterval(this.timerInterval);
  }
}
