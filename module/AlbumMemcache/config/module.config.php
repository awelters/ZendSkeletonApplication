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
    
    'di' => array(
		'instance' => array(
			'alias' => array(
				'em-' . __NAMESPACE__ => 'Doctrine\ORM\EntityManager',
			),
			'em-' . __NAMESPACE__ => array(
				'parameters' => array(
					'name' => __NAMESPACE__,
					'container' => 'doctrine-container',
				),
			),
			'doctrine-container' => array(
				'parameters' => array(
					'evm' => array(
						__NAMESPACE__ => array(
							'class' => 'Doctrine\Common\EventManager',
							'subscribers' => array(),
						),
					),
					'em' => array(
						__NAMESPACE__ => array(
							'cache' => array(
								'metadata' => __NAMESPACE__,
								'query' => __NAMESPACE__,
								'result' => __NAMESPACE__,
							),
							'connection' => __NAMESPACE__,
							'logger' => null,
							'proxy' => array(
								'generate' => true,
								'dir' => '/../../../data/DoctrineORMModule/Proxy',
								'namespace' => __NAMESPACE__ . '\Proxy',
							),
							'registry' => array(
								'files' => array(),
								'namespaces' => array(),
							),
							'driver' => array(
								'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
								'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity'),
								'reader' => array(
									'class' => 'Doctrine\Common\Annotations\AnnotationReader',
									'aliases' => array(),
								),
							),
						),
					),
				),
			),
		),
	),
);