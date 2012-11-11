<?php
// module/AlbumMemcache/config/module.config.php:
namespace AlbumMemcache;

return array(
    'controllers' => array(
        'invokables' => array(
            'AlbumMemcache\Controller\Album' => 'AlbumMemcache\Controller\AlbumController',
        ),
    ),
    
    'router' => array(
        'routes' => array(
            'album-memcache' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/album-memcache[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'AlbumMemcache\Controller\Album',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    
    'view_manager' => array(
        'template_path_stack' => array(
            'album-memcache' => __DIR__ . '/../view',
        ),
    ),
    
    // Doctrine config
    'doctrine' => array(
        'driver' => array(
            __NAMESPACE__ . '_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'memcache',
                'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                )
            )
        ),
        'configuration' => array(
            'orm_default' => array(
                'metadata_cache'    => 'memcache',
                'query_cache'       => 'memcache',
                'result_cache'      => 'memcache',

                'driver'            => 'orm_default',

                'generate_proxies'  => true,
                'proxy_dir'         => 'data/DoctrineORMModule/Proxy',
                'proxy_namespace'   => 'DoctrineORMModule\Proxy',
                'filters'           => array()
            )
        )
    )
);