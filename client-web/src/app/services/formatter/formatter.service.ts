import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  isEmail(input: string) {
    const pattern = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@'
      + '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?'
      + '(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';

    if (input.match(new RegExp(pattern, 'gi')) != null) {
      return true;
    } else {
      return false;
    }
  }
}
