ZendSkeletonApplication
=======================

Introduction
------------
This is a application using the ZF2 MVC layer and module systems. This
application is meant to be used as a starting place for those looking to
progress past the ZendSkeletonApplication.  It is an update to the original
ZendSkeletonApplication, but with improvements and additional examples.

There are module examples of an Album, an Album using DoctrineORM, an Album
using DoctrineORM with Annotations, an Album using DoctrineORM with
Annotations and Memcache, and an Album using DoctrineORM with Annotations
as a RESTful service.  If you go from the first to the last it should help
guide you in using Zend Framework 2.


Installation
------------

Using Composer (recommended)
----------------------------
The recommended way to get a working copy of this project is to clone the
repository and manually invoke `composer` using the shipped `composer.phar`:

    cd my/project/dir
    git clone git://github.com/awelters/ZendSkeletonApplication.git
    cd ZendSkeletonApplication
    php composer.phar self-update
    php composer.phar install

(The `self-update` directive is to ensure you have an up-to-date `composer.phar`
available.)

Database
------------
Run the script `./database_script/zf2tutorial.sql` and then rename the file
`./config/autoload/local.php.dist` to `local.php` before adding your
database username and password.

Virtual Host
------------
Set up a virtual host configuration similar to this:

	<VirtualHost *:80>
    	ServerName zf2-tutorial.localhost
    	ServerAdmin you@youremail.com
    	DocumentRoot my/project/dir/zf2-tutorial/public
    	SetEnv APPLICATION_ENV "development"
    	<Directory my/project/dir/zf2-tutorial/public>
       		DirectoryIndex index.php
        	AllowOverride All
        	Order allow,deny
        	Allow from all
    	</Directory>
    
    	ErrorLog my/project/dirzf2-tutorial/logs/error.log
  
    	<IfModule log_config_module>
			CustomLog my/project/dir/zf2-tutorial/logs/access.log combinedio
		</IfModule>
	
		php_value error_log my/project/dir/zf2-tutorial/logs/php_error.log
	</VirtualHost>

Virtual Host
------------
	./config/application.config.php

Memcache
------------
The memcache version of the Album module will not work unles you have the
memcache module installed for php and the memcache daemon running on
your local machine, `localhost`, listening on the standard port, `11211`.
