import { Injectable } from '@angular/core';
import { encodeMap } from 'src/app/app.const';

@Injectable({
  providedIn: 'root'
})
export class EncoderService {

  constructor() { }

  public encodeString(stringToEncode: string): string {

    let encodedString = '';
    for (let i = 0; i <= stringToEncode.length; i++) {
      const letter = stringToEncode[i];
      if (!letter) { continue; }
      const encodedNumber = encodeMap.indexOf(letter);
      if (encodedNumber == -1) {
        console.log(letter);
      }
      encodedString += ' ' + encodedNumber;
    }
    return encodedString;
  }
}
