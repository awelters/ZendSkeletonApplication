<?php
// module/AlbumRESTful/config/module.config.php:
namespace AlbumRESTful;

return array(
	'controllers' => array(
        'invokables' => array(
            __NAMESPACE__.'\Controller\\'.__NAMESPACE__ => __NAMESPACE__.'\Controller\\'.__NAMESPACE__.'Controller',
             __NAMESPACE__.'\Controller\AlbumClient' => __NAMESPACE__.'\Controller\AlbumClientController',
        ),
    ),
    'router' => array(
        'routes' => array(
            __NAMESPACE__ => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/album-restful[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller'    => __NAMESPACE__.'\Controller\\'.__NAMESPACE__,
                    ),
                )
            ),
        ),
    ),
	'view_manager' => array(
        'strategies' => array(
			'ViewJsonStrategy',
		),
    ),
    // Doctrine config
    'doctrine' => array(
        'driver' => array(
            __NAMESPACE__ . '_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                )
            )
        )
    )
);
