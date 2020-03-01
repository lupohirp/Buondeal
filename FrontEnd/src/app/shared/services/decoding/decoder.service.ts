import { Injectable } from '@angular/core';
import { encodeMap } from 'src/app/app.const';

@Injectable({
  providedIn: 'root'
})
export class DecoderService {

  constructor() { }

  public decodeString(stringToDecode): string {

    stringToDecode = stringToDecode.trim().split(' ');
    let decodedString = '';

    const stringToDecodeArray = new Array();

    for (let i = 0; i <= stringToDecode.length; i++) {
      if (stringToDecode[i] === '' || stringToDecode[i] === ' ' || !stringToDecode[i]) { continue; }
      stringToDecodeArray.push(stringToDecode[i]);
    }


    for (const encodeKey of stringToDecodeArray) {
      decodedString += encodeMap[encodeKey];
    }

    return decodedString;
  }
}
