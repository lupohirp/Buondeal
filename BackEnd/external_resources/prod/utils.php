<?php

function decodeString($inputString)
{
    $stringDecoded = "";
    $encodeMap = ["m", "2", "+", "\\", "$", "Q", "&", "D", "U", "s", "B", "?", "-",
  "0", "?", "?", "?", ";", "u", "S", "8", "*", "t", "j", "V", "b", "^", "W", "n", "H", "R",
  "7", "3", "M", "[", "5", "?", "?", "#", "e", ":", "1", ",", "Z", "F", "E", "]", "(", "4", "à", "ò",
  "\"", "A", "9", "c", "r", ".", "Y", "ì", "a", "L", "?", "w", "%", "o", "è", "d", "C", "i", "G", "z", "q", "I", "l", "?", "/", " ", "ù",
  "N", "P", "T", "{", "K", "x", "Ì", "6", "!", "à", "v", "?", "È", "O", "@", "?", "J", "X", "h", "k", "=", "p", "Ò", "f", "Ù", "À", "_", "?", ")", "y", "}", "g", "<", ">"];
    foreach ($inputString as $value) {
        if (!isset($encodeMap[$value])) {
            continue;
        }

        $stringDecoded = $stringDecoded . $encodeMap[$value];
    }
    return $stringDecoded;
}

function encodeString($inputString)
{
    $encodeMap = [ "m", "2", "+", "\\", "$", "Q", "&", "D", "U", "s", "B", "?", "-",
  "0", "?", "?", "?", ";", "u", "S", "8", "*", "t", "j", "V", "b", "^", "W", "n", "H", "R",
  "7", "3", "M", "[", "5", "?", "?", "#", "e", ":", "1", ",", "Z", "F", "E", "]", "(", "4", "à", "ò",
  "\"", "A", "9", "c", "r", ".", "Y", "ì", "a", "L", "?", "w", "%", "o", "è", "d", "C", "i", "G", "z", "q", "I", "l", "?", "/", " ", "ù",
  "N", "P", "T", "{", "K", "x", "Ì", "6", "!", "à", "v", "?", "È", "O", "@", "?", "J", "X", "h", "k", "=", "p", "Ò", "f", "Ù", "À", "_", "?", ")", "y", "}", "g", "<", ">"];
    $encodedString = "";
    $inputString = str_split($inputString);
    foreach ($inputString as $value) {
        $key = array_search($value, $encodeMap) . " ";
        $encodedString = $encodedString . $key;
    }

    return $encodedString;
}
