<?php
# logging
/*
[2017-03-20 3:35:43] [INFO] [file.php] Here we are
[2017-03-20 3:35:43] [ERROR] [file.php] Not good
[2017-03-20 3:35:43] [DEBUG] [file.php] Regex empty

mylog ('hallo') -> INFO
mylog ('fail', 'e') -> ERROR
mylog ('next', 'd') -> DEBUG
mylog ('next', 'd', 'debug.log') -> DEBUG file debug.log
*/



function bd_log($text, $level='i', $clazz) {
	$LOG_FILE = $_SERVER['DOCUMENT_ROOT'] . "/logs/buondeal.log";
    switch (strtolower($level)) {
        case 'e':
        case 'error':
            $level='ERROR';
            break;
        case 'i':
        case 'info':
            $level='INFO';
            break;
        case 'd':
        case 'debug':
            $level='DEBUG';
            break;
        default:
            $level='INFO';
    }
    error_log(date("[Y-m-d H:i:s]")."\t[".$level."]\t[".$clazz."]\t".$text."\n", 3, $LOG_FILE);
}

?>