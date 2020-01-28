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

  write(key: string) {
    let p1 = Writter.input.selectionStart;
    let p2 = Writter.input.selectionEnd;

    let value =  Writter.input.value.substr(0, p1);
    value += key;
    value += Writter.input.value.substr(p2);

    p1++;
    p2 = p1;
    Writter.input.value = value;
    Writter.input.selectionStart = p1;
    Writter.input.selectionEnd = p2;
  }

  delete() {
    let p1 = Writter.input.selectionStart;
    let p2 = Writter.input.selectionEnd;

    if (
      (p1 > 0) &&
      (p1 === p2)
    ) {
      p1--;
    }

    let value = Writter.input.value.substr(0, p1);
    value += Writter.input.value.substr(p2);
    Writter.input.value = value;

    p2 = p1;
    Writter.input.selectionStart = p1;
    Writter.input.selectionEnd = p2;
  }

  moveLeft() {
    let p1 = Writter.input.selectionStart;
    let p2 = Writter.input.selectionEnd;

    if (p1 === p2) {
      p1--;
    }

    p2 = p1;
    Writter.input.selectionStart = p1;
    Writter.input.selectionEnd = p2;

    setTimeout(() => {
      Writter.input.focus();
    }, 50);
  }

  moveRight() {
    let p1 = Writter.input.selectionStart;
    let p2 = Writter.input.selectionEnd;

    if (p1 === p2) {
      p2++;
    }

    p1 = p2;
    Writter.input.selectionStart = p1;
    Writter.input.selectionEnd = p2;

    setTimeout(() => {
      Writter.input.focus();
    }, 50);
  }
}
