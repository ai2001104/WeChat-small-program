<?php
/**
 * 微信小程序的日常接口调用
 * User: cory
 * Date: 2016/11/11
 * Time: 10:40
 */

$type = trim($_GET['type']);
$key = '';

switch ($type){
    case 'card' :
        $key = getenv('JUHE_API_KEY');
        if ($key === false || $key === '') {
            die('error : missing JUHE_API_KEY');
        }
        $cardno = isset($_GET['cardno']) ? trim($_GET['cardno']) : '';
        if (!preg_match('/^\d{17}[\dXx]$/', $cardno)) {
            die('error : invalid cardno');
        }
        $get_res = file_get_contents('http://apis.juhe.cn/idcard/index?cardno='.urlencode($cardno).'&key='.urlencode($key) );
        echo $get_res;
        break;

    default:
        die('error : no type 404');
}