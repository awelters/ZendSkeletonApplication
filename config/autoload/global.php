<?php
// config/autoload/global.php:

/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

return array(
    'db' => array(
        'driver'         => 'Pdo_Mysql',
        'dbname'      	 => 'zf2tutorial',
        'host'			 => 'localhost',
        'port'			 => '3306',
        'username' 		 => '',
        'password' 		 => '',
        'driver_options' => array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'Zend\Db\Adapter\Adapter'
                    => 'Zend\Db\Adapter\AdapterServiceFactory',
        ),
    ),
    'doctrine' => array(
        'connection' => array(
            'orm_default' => array(
                'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
                'params' => array(
                    'host'     => 'localhost',
                    'port'     => '3306',
                    'user'     => '',
                    'password' => '',
                    'dbname'   => 'zf2tutorial',
                )
            )
        )
    ),
    'di' => array(
		'instance' => array(
			'doctrine-container' => array(
				'parameters' => array(
					'connection' => array(
						'AlbumMemcache' => array(
							'evm' => 'AlbumMemcache',
							'dbname' => 'zf2tutorial',
							'user' => '',
							'password' => '',
							'host' => 'localhost',
							'driver' => 'pdo_mysql',
						),
					),
					'cache' => array(
						'AlbumMemcache' => array(
							'class' => 'Doctrine\Common\Cache\MemcacheCache',
							'host' => 'localhost',
							'port' => 11211,
						),
					),
				),
			),
		),
	),
);
