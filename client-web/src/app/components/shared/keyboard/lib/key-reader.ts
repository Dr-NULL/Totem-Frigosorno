import { StaticRef } from './static-ref';
import SYS, { isSystemKey } from './system-keys';
import { Anime } from './anime';
import { Key } from './layout';

export class KeyReader {
  private key: Key;
  private anime: Anime;

  private p1Value: number;
  private get p1(): number {
    return this.p1Value;
  }
  private set p1(v: number) {
    this.p1Value = v;
    StaticRef.currentInput.nativeElement.selectionStart = v;
  }
  private p2Value: number;
  private get p2(): number {
    return this.p2Value;
  }
  private set p2(v: number) {
    this.p2Value = v;
    StaticRef.currentInput.nativeElement.selectionEnd = v;
  }
  private get value(): string {
    return StaticRef.currentInput.nativeElement.value;
  }
  private set value(v: string) {
    StaticRef.currentInput.nativeElement.value = v;
  }

  static readKey(key: Key, anime: Anime) {
    const OBJ = new KeyReader(key, anime);
    if (!isSystemKey(key)) {
      OBJ.writeChar();
    } else {
      OBJ.execFunct();
    }
  }


  constructor(key: Key, anime: Anime) {
    this.key = key;
    this.anime = anime;
    this.p1Value = StaticRef.currentInput.nativeElement.selectionStart;
    this.p2Value = StaticRef.currentInput.nativeElement.selectionEnd;
  }

  writeChar() {
    if (this.key.value == null) {
      this.anime.hold = false;
      this.anime.mode = 'default';
      return;
    }

    const v = this.value.substr(0, this.p1)
      + this.key.value
      + this.value.substr(this.p2, this.value.length);

    this.value = v;
    this.p1++;
    this.p2 = this.p1;

    if (
      (!this.anime.hold) &&
      (this.anime.mode !== 'default')
    ) {
      this.anime.hold = false;
      this.anime.mode = 'default';
    }

    const event = new KeyboardEvent('keyup');
    StaticRef.currentInput.nativeElement.dispatchEvent(event);
  }

  execFunct() {
    switch (this.key) {
      case SYS.LEFT:
        this.onKeyLeft();
        break;
      case SYS.RIGHT:
        this.onKeyRight();
        break;
      case SYS.CAPS:
        this.onKeyCaps();
        break;
      case SYS.SHIFT:
        this.onKeyShift();
        break;
      case SYS.ALTGR:
        this.onKeyAltgr();
        break;
      case SYS.BACK:
        this.deleteChar();
        break;
    }
  }

  onKeyLeft() {
    if (
      (this.p1 > 0) &&
      (this.p1 === this.p2)
    ) {
      this.p1--;
    }

    this.p2 = this.p1;
  }

  onKeyRight() {
    if (
      (this.p2 < this.value.length) &&
      (this.p1 === this.p2)
    ) {
      this.p2++;
    }

    this.p1 = this.p2;
  }

  onKeyShift() {
    this.anime.hold = false;
    if (this.anime.mode === 'default') {
      this.anime.mode = 'shift';
    } else {
      this.anime.mode = 'default';
    }
  }

  onKeyCaps() {
    if (this.anime.mode === 'default') {
      this.anime.hold = true;
      this.anime.mode = 'shift';
    } else {
      this.anime.hold = false;
      this.anime.mode = 'default';
    }
  }

  onKeyAltgr() {
    this.anime.hold = false;
    if (this.anime.mode === 'default') {
      this.anime.mode = 'altgr';
    } else {
      this.anime.mode = 'default';
    }
  }

  deleteChar() {
    if (this.key.value == null) {
      this.anime.hold = false;
      this.anime.mode = 'default';
      return;
    }

    if (
      (this.p1 === this.p2) &&
      (this.p1 > 0)
    ) {
      this.p1--;
    }

    const v = this.value.substr(0, this.p1)
      + this.value.substr(this.p2, this.value.length);

    this.value = v;
    this.p2 = this.p1;

    this.anime.hold = false;
    this.anime.mode = 'default';
  }
}
