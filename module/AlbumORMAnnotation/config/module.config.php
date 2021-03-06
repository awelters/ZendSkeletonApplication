<?php
// module/AlbumORMAnnotation/config/module.config.php:
namespace AlbumORMAnnotation;

return array(
    'controllers' => array(
        'invokables' => array(
            'AlbumORMAnnotation\Controller\Album' => 'AlbumORMAnnotation\Controller\AlbumController',
        ),
    ),
    
    'router' => array(
        'routes' => array(
            'album-orm-annotation' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/album-orm-annotation[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'AlbumORMAnnotation\Controller\Album',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    
    'view_manager' => array(
        'template_path_stack' => array(
            'album-orm-annotation' => __DIR__ . '/../view',
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