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
    Writter.input.value = value;

    p1++;
    p2 = p1;
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
  }

  getAllFocusable() {
    const query = 'a:not([tabindex="-1"]):not([disabled]), '
      + 'input:not([tabindex="-1"]):not([disabled]), '
      + 'button:not([tabindex="-1"]):not([disabled]), '
      + 'select:not([tabindex="-1"]):not([disabled]), '
      + 'textarea:not([tabindex="-1"]):not([disabled])';

    const node: HTMLElement[] = [];
    document
      .querySelectorAll(query)
      .forEach((item: HTMLElement) => {
        node.push(item);
      });

    return node;
  }

  prevInput() {
    const node = this.getAllFocusable();
    const focus = (i: number) => {
      setTimeout(() => {
        node[i].focus();
      }, 50);
    };

    for (let i = 0; i < node.length; i++) {
      if (node[i].isSameNode(Writter.input)) {
        if (i === 0) {
          focus(node.length - 1);
        } else {
          focus(i - 1);
        }
      }
    }
  }

  nextInput() {
    const node = this.getAllFocusable();
    const focus = (i: number) => {
      setTimeout(() => {
        node[i].focus();
      }, 50);
    };

    for (let i = 0; i < node.length; i++) {
      if (node[i].isSameNode(Writter.input)) {
        if (i === node.length - 1) {
          focus(0);
        } else {
          focus(i + 1);
        }
      }
    }
  }
}
