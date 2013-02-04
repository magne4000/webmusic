<?php
require_once dirname(__FILE__).'/../app/include.php';
session_start();

function isLogged(){
    return isset($_SESSION['logged']);
}

function canlogin(){
    $user = Config::get('admin', 'user');
    return !empty($user);
}

function login($user, $password){
    if (canlogin()){
        if ($user === Config::get('admin', 'user') && $password === Config::get('admin', 'password')){
            $_SESSION['logged'] = true;
            return true;
        }
    }
    return false;
}

function logout(){
    unset($_SESSION['logged']);
}