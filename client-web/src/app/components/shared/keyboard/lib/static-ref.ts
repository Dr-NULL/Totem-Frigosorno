import { KeyboardComponent } from '../keyboard.component';
import { ElementRef } from '@angular/core';

export class StaticRef {
  public static currentInput: ElementRef<HTMLInputElement>;
  public static keyboards: { [key: string]: KeyboardComponent } = {};
}
