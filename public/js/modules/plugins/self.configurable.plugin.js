/**
* @fileoverview
* Self Configuring Plugin - instantiated and configured when events are fired
*
* Sample usage:
*   Take advantage of HTML5 data attributes to support customization of the plugin on a per-element
*   basis. For example:
*   <div class="elem" data-self-configurable-plugin-metadata='{"message":"Goodbye World!"}'></div>
*
* @author: Andrew Welters (awelters@life-interactive.net)
* Thanks to Twitter Bootstrap for ideas - https://github.com/twitter/bootstrap
* See https://github.com/twitter/bootstrap/blob/master/js/bootstrap-alert.js
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
  ZF2Tutorial.namespace("SelfConfigurablePlugin");
  
  // our plugin constructor
  ZF2Tutorial.SelfConfigurablePlugin = function(el, options) {
	this.init(el,options);
  };

  // the plugin prototype
  ZF2Tutorial.SelfConfigurablePlugin.prototype = {
	//assign the constructor properly otherwise its:
	//function Object() { [native code] } 
    constructor: ZF2Tutorial.SelfConfigurablePlugin,
	
	// Introduce defaults that can be extended either 
    // globally or using an object literal.
    defaults: {
      message: 'Hello World!'
    },
	
	//----------------------------------------------------------------------
	// Public Functions
	//----------------------------------------------------------------------
	init: function(el,options) {
	  this.$el = $(el);
      this.options = options;
	  
	  //get an object from the data-self-configurable-plugin-metadata attribute
      this.metadata = this.$el.data( 'self-configurable-plugin-metadata' );
	  
      // Note order of merge operations:  options -> metadata -> defaults -> {} 
      this.config = $.extend({}, this.defaults, this.metadata, this.options);
	  console.log('SelfConfigurablePlugin: init: '+this.config.message);
	  return this;
	}
  }

  //now make it into a jquery plugin
  $.fn.selfConfigurablePlugin = function(options) {
	
	//for each matching selector create a plugin for it
	//Note:  uses plugin best practice by returning this for chaining
	return this.each(function() {
	
	  var $this = $(this);
	  var data = $this.data('selfConfigurablePlugin');
	  //options is false if option is not an object or doesn't exist
	  var options = typeof option == 'object' && option;
		
	  //only create the plugin for the element if it doesn't already exist
	  //and add a reverse reference to the DOM object
	  if (!data) $this.data('selfConfigurablePlugin', new ZF2Tutorial.SelfConfigurablePlugin(this,options));
	  
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
			$.error( 'Function ' +  option + ' does not exist on jQuery.selfConfigurablePlugin' );
			
	  }
	  
	});
	
  };
  
  //Plugin Class for plugin
  //See http://stackoverflow.com/questions/10525600/what-is-the-purpose-of-fn-foo-constructor-foo-in-twitter-bootstrap-js
  $.fn.selfConfigurablePlugin.Constructor = ZF2Tutorial.SelfConfigurablePlugin;
  
  //define plugin defaults as the prototype defaults
  $.fn.selfConfigurablePlugin.defaults = ZF2Tutorial.SelfConfigurablePlugin.defaults = ZF2Tutorial.SelfConfigurablePlugin.prototype.defaults;
  
  //AN EXAMPLE OF SELF INSTANTATION AND CONFIGURATION WHEN AN EVENT IS FIRED
  //runs on when the page is fully loaded.
  //SEE http://4loc.wordpress.com/2009/04/28/documentready-vs-windowload/
  $(window).on('load', function () {
	$('[data-self-configurable-plugin-metadata]').selfConfigurablePlugin();
  });

}( jQuery, window );