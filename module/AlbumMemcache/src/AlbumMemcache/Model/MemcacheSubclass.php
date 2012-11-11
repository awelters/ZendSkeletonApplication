<?php
// module/AlbumMemcache/src/AlbumMemcache/Model/MemcacheSubclass.php:
namespace AlbumMemcache\Model;

use \Memcache;

class MemcacheSubclass extends \Memcache 
{
    public function __construct() 
    { 
        //parent::__construct(); 

        $this->connect('localhost', 11211);

    } 
}