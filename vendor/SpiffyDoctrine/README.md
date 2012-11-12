# SpiffyDoctrine Module for Zend Framework 2

The SpiffyDoctrine module intends to integrate Doctrine 2 with the Zend Framework quickly and easily. 
The following features are intended to work out of the box: 

  - Configuration and creation of multiple entity managers, cache instance, connections, and event managers.
  - Specifying separate cache instances for metadata, query, and result caches.
  - Using a SQL Logger.
  - Configuration of annotations via registry files and/or namespaces (such as Gedmo DoctrineExtensions).

## Example standard configuration

    // modules/Application/module.config.php
    'di' => array(
        'instance' => array(
            'doctrine-container' => array(
                'parameters' => array(
                    'connection' => array(
                        'default' => array(
                            'evm' => 'default',
                            'dbname' => 'mydb',
                            'user' => 'root',
                            'password' => '',
                            'host' => 'localhost',
                            'driver' => 'pdo_mysql'
                        )
                    ),
                    'em' => array(
                        'default' => array(
                            'driver' => array(
                                'paths' => array(
                                    '/path/to/your/entities',
                                ),
                            )
                        )
                    )
                )
            )
        )
    )


## Usage

### Accessing the default, pre-configured, entity-manager instance
A default EntityManager instance has been configured for you and is called em-default. You can access
it from an ActionController using the locator as follows:

    $em = $this->getLocator()->get('em-default');
    
If for some reason you want access to additional objects such as the EVM, Cache, or Connection instances
you can get them from the SpiffyDoctrine\Container\Container.

    $container = $this->getLocator()->get('doctrine-container');
