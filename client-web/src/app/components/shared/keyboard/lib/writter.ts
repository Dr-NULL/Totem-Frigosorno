import { KeyboardComponent } from '../keyboard.component';
import SYS from './system-keys';

export class Writter {
  // Variable estática que almacena el Input actual
  private static rawInput: HTMLInputElement;
  public static get input(): HTMLInputElement {
    return this.rawInput;
  }
  public static set input(v: HTMLInputElement) {
    this.rawInput = v;
  }

  get p1() {
    return Writter.input.selectionStart;
  }
  set p1(v: number) {
    Writter.input.selectionStart = v;
  }

  get p2() {
    return Writter.input.selectionEnd;
  }
  set p2(v: number) {
    Writter.input.selectionEnd = v;
  }

  private focus() {
    setTimeout(() => {
      Writter.input.focus();
    }, 50);
  }

  write(key: string) {
    let value =  Writter.input.value.substr(0, this.p1);
    value += key;
    value += Writter.input.value.substr(this.p2);

    this.p1++;
    this.p2 = this.p1;
    Writter.input.value = value;
    this.focus();
  }

  delete() {
    if (
      (this.p1 > 0) &&
      (this.p1 === this.p2)
    ) {
      this.p1--;
    }

    let value = Writter.input.value.substr(0, this.p1);
    value += Writter.input.value.substr(this.p2);
    Writter.input.value = value;

    this.p2 = this.p1;
    this.focus();
  }

  moveLeft() {
    if (this.p1 === this.p2) {
      this.p1--;
    }

    this.p2 = this.p1;
    this.focus();
  }

  moveRight() {
    if (this.p1 === this.p2) {
      this.p2++;
    }

    this.p1 = this.p2;
    this.focus();
  }
}
