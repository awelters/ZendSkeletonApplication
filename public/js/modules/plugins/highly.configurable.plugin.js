/**
* @fileoverview
* See http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
* 'Highly configurable' mutable jquery plugin ZF2Tutorial
* Note that with this pattern, as per Alex Sexton's, the plugin logic
* hasn't been nested in a jQuery plugin. Instead, we just use
* jQuery for its instantiation.
* 
* Uses jQuery best practice and allows chaining.
* See Maintaining Chainability - http://docs.jquery.com/Plugins/Authoring
*
* Sample usage:
*   Take advantage of HTML5 data attributes to support customization of the plugin on a per-element
*   basis. For example:
*   <div class="elem" data-highly-configurable-plugin-options='{"message":"Goodbye World!"}'></div>
*   or, set the message per instance:
*   $('.elem').highlyConfigurablePlugin({ message: 'Goodbye World!'});
*   or, set the global default message:
*   HighlyConfigurablePlugin.defaults.message = 'Goodbye World!'
*
* @author: @markdalgleish
* Further changes, comments: @addyosmani, Andrew Welters (awelters@life-interactive.net)
* Thanks to Twitter Bootstrap for additional ideas - https://github.com/twitter/bootstrap
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
;!function( $, undefined ){

	// undefined is used here as the undefined global 
	// variable in ECMAScript 3 and is mutable (i.e. it can 
	// be changed by someone else). undefined isn't really 
	// being passed in so we can ensure that its value is 
	// truly undefined. In ES5, undefined can no longer be 
	// modified.

  //See http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  "use strict";

  //namespace it
  ZF2Tutorial.namespace("HighlyConfigurablePlugin");
  
  // our plugin constructor
  ZF2Tutorial.HighlyConfigurablePlugin = function(el, options) {
	this.init(el,options);
  };

  // the plugin prototype
  ZF2Tutorial.HighlyConfigurablePlugin.prototype = {
	//assign the constructor properly otherwise its:
	//function Object() { [native code] } 
    constructor: ZF2Tutorial.HighlyConfigurablePlugin,
	
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
	  
	  //get an object from the data-highly-configurable-plugin-metadata attribute
      this.metadata = this.$el.data( 'highly-configurable-plugin-metadata' );
	  
      // Note order of merge operations:  options -> metadata -> defaults -> {} 
      this.config = $.extend({}, this.defaults, this.metadata, this.options);
	  console.log('HighlyConfigurablePlugin: init: '+this.config.message);
	  return this;
	},
  }
  
  //now make it into a jquery plugin
  $.fn.highlyConfigurablePlugin = function(options) {
  
	//for each matching selector create a plugin for it
	//Note:  uses plugin best practice by returning this for chaining
	return this.each(function() {
	
	  var $this = $(this);
	  var data = $this.data('highlyConfigurablePlugin');
	  //options is false if option is not an object or doesn't exist
	  var options = typeof option == 'object' && option;
		
	  //only create the plugin for the element if it doesn't already exist
	  //and add a reverse reference to the DOM object
	  if (!data) $this.data('highlyConfigurablePlugin', new ZF2Tutorial.HighlyConfigurablePlugin(this,options));
	  
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
			$.error( 'Function ' +  option + ' does not exist on jQuery.highlyConfigurablePlugin' );
			
	  }
	  
	});
	
  };
  
  //Plugin Class for plugin
  //See http://stackoverflow.com/questions/10525600/what-is-the-purpose-of-fn-foo-constructor-foo-in-twitter-bootstrap-js
  $.fn.highlyConfigurablePlugin.Constructor = ZF2Tutorial.HighlyConfigurablePlugin;
  
  //define plugin defaults as the prototype defaults
  $.fn.highlyConfigurablePlugin.defaults = ZF2Tutorial.HighlyConfigurablePlugin.defaults = ZF2Tutorial.HighlyConfigurablePlugin.prototype.defaults;

}( jQuery );