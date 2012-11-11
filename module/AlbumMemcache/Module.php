<?php
// module/AlbumMemcache/Module.php
namespace AlbumMemcache;

use \Memcache;

class Module
{
    public function getAutoloaderConfig()
    {
        return array(
        	'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
    
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
    
    public function getServiceConfig()
    {
        return array(
			'factories' => array(
				'my_memcache_alias' => function($sm) {
					$memcache = new \Memcache();
					$memcache->connect('localhost', 11211);
					return $memcache;
				} 
			)
        );
    }
}
