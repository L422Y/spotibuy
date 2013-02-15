<?php
/**
 * User: Larry
 * Date: 10/12/12
 * Time: 4:53 PM
 */

$url = $_REQUEST['url'];

$hash = md5($url);
$hash_loc = 'storage/' . $hash;
if (!file_exists($hash_loc) || time() - filemtime($hash_loc) > 600) {
    $results = file_get_contents($url);
    file_put_contents($hash_loc, $results);
} else {
    $results = file_get_contents($hash_loc);
}

print $results;


