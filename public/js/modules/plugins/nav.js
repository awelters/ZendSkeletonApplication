/**
* @fileoverview
* Highlights the correct nav item when the dom is ready aka it's self-configurable
*
* @author: Andrew Welters (awelters@life-interactive.net)
*
* @static
*/

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.  The ! before the function
// invokes the anonymous function immediately and is shorthand for:
// (function(){})();
// SEE http://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function
;!function( $, window, undefined ){

	// undefined is used here as the undefined global 
	// variable in ECMAScript 3 and is mutable (i.e. it can 
	// be changed by someone else). undefined isn't really 
	// being passed in so we can ensure that its value is 
	// truly undefined. In ES5, undefined can no longer be 
	// modified.
	
	// window is passed through as a local variable
	// rather than as global, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when regularly
	// referenced in your plugin).

  //See http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  "use strict";

  //namespace it
  ZF2Tutorial.namespace("Nav");
  
  // our plugin constructor
  ZF2Tutorial.Nav = function(el, options) {
	this.init(el,options);
  };

  // the plugin prototype
  ZF2Tutorial.Nav.prototype = {
    //assign the constructor properly otherwise its:
	//function Object() { [native code] } 
    constructor: ZF2Tutorial.Nav,
	
	// Introduce defaults that can be extended using an object literal.
	defaults: {
		activate: 'home',
		style: 'active'
	},
	
	//----------------------------------------------------------------------
	// Public Functions
	//----------------------------------------------------------------------
	init: function(el,options) {
	  this.$el = $(el);
	  this.options = options;
	
	  // Note order of merge operations:  options -> defaults -> {} 
	  this.config = $.extend({}, this.defaults, this.options);
	  
	  //do work based on this.config.active
	  var $activate;
	  try {
	  	if(this.config.activate)
	  		$activate = this.$el.find('.'+this.config.activate);
	  	else
	  		$activate = this.$el.find('.'+ZF2Tutorial.Nav.prototype.defaults.activate);
	  }
	  catch(e) {}
	  
	  if($activate && $activate.length) {
	  	 $activate.siblings().removeClass(this.config.style);
		 $activate.addClass(this.config.style);
	  }
	  else
	  	this.$el.children().removeClass(this.config.style);
	}
  }

  //now make the jquery plugin
  $.fn.nav = function(option) {
  
	//for each matching selector create a plugin for it
	//Note:  uses plugin best practice by returning this for chaining
	return this.each(function() {
	
	  var $this = $(this);
	  var data = $this.data('nav');
	  //options is false if option is not an object or doesn't exist
	  var options = typeof option == 'object' && option;
		
	  //only create the plugin for the element if it doesn't already exist
	  //and add a reverse reference to the DOM object
	  if (!data) $this.data('nav', new ZF2Tutorial.Nav(this,options));
	  
	  //if option is a string then treat it as if you're calling a function
	  //where option is the name of the function to be called.
	  if (typeof option == 'string') {
	  
		//call the function only if it exists and is not pseudo private
		if ( data[option] && option.charAt(0) != '_' ) {
		
			//if return value is false will stop the loop
			//SEE http://api.jquery.com/each/
			return data[option](Array.prototype.slice.call( arguments, 1 ));
			
		}
		else
			$.error( 'Function ' +  option + ' does not exist on jQuery.nav' );
			
	  }
	  
	});
	
  };
  
  //Plugin Class for plugin
  //See http://stackoverflow.com/questions/10525600/what-is-the-purpose-of-fn-foo-constructor-foo-in-twitter-bootstrap-js
  $.fn.nav.Constructor = ZF2Tutorial.Nav;
  
  //define plugin defaults as the prototype defaults
  $.fn.nav.defaults = ZF2Tutorial.Nav.defaults = ZF2Tutorial.Nav.prototype.defaults;
  
  //runs on when the DOM is fully loaded.
  //SEE http://api.jquery.com/ready/
  $(function () {
    var loc = window.location.pathname.substring(1);
    var slashIndex = loc.indexOf('/');
  	$('.nav').nav({"activate":loc.substring(0,slashIndex == -1 || slashIndex == 0 ? loc.length : slashIndex)});
  });

}( jQuery, window );