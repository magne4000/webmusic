<?php
/**
 * Sends data to the handling ajax progress handler
 */
function yield($data){
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest'){
        throw new exception('Yielding result only works with XHR!');
    }else{
        if (!headers_sent()){
            header("Content-Type: application/octet-stream");
        }
        @ob_end_flush();
        fflush(fopen('php://stdout', 'r'));
        flush();
        echo $data."\n";
        @ob_end_flush();
        fflush(fopen('php://stdout', 'r'));
        flush();
    }
}