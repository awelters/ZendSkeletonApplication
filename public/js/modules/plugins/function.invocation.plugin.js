/**
* @fileoverview
* An example of a function invocation on a plugin with chaining.
* This plugin can be instantiated on all selected elements,
* and function invocation occurs on all elements.  This
* means chaining can take place.
*
* Here is an example of function invocation on all elements:
*   $('.elem').functionInvocationPlugin();
*   $('.elem').functionInvocationPlugin('publicFunction').css('background-color','red');
*
* @author: Andrew Welters (awelters@life-interactive.net)
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
  ZF2Tutorial.namespace("FunctionInvocationPlugin");
  
  // our plugin constructor
  ZF2Tutorial.FunctionInvocationPlugin = function(el, options) {
	this.init(el,options);
  };

  // the plugin prototype
  ZF2Tutorial.FunctionInvocationPlugin.prototype = {
    //assign the constructor properly otherwise its:
	//function Object() { [native code] } 
    constructor: ZF2Tutorial.FunctionInvocationPlugin,
	
	// Introduce defaults that can be extended using an object literal.
	defaults: {
		message: 'Hello World!'
	},
	
	//----------------------------------------------------------------------
	// Public Functions
	//----------------------------------------------------------------------
	init: function(el,options) {
	  this.$el = $(el);
	  this.options = options;
	
	  // Note order of merge operations:  options -> defaults -> {} 
	  this.config = $.extend({}, this.defaults, this.options);
		
	  //call a private method with our context aka 'this'
	  privateFunction.call(this);
	  
	  //call the pseudo private method
	  this._privateFunction(this);
	},
	
	publicFunction: function() {
	  console.log('FunctionInvocationPlugin: publicFunction: '+this.config.message);
    },
	
	//----------------------------------------------------------------------
	// Pseudo Private Functions
	// 
	// Thanks to Dennis Evert (devert@olson.com) for pointing out
	// that this is faster/uses less memory because it's shared with every
	// instance as it's in the prototype chain
	//----------------------------------------------------------------------
	_privateFunction: function() {
	  console.log('FunctionInvocationPlugin: _privateFunction: '+this.config.message);
	}
  }

  //----------------------------------------------------------------------
  // Private Functions
  //----------------------------------------------------------------------
  function privateFunction() {
	console.log('FunctionInvocationPlugin: privateFunction: '+this.config.message);
  }
  
  //now make the jquery plugin
  $.fn.functionInvocationPlugin = function(option) {
  
	//for each matching selector create a plugin for it
	//Note:  uses plugin best practice by returning this for chaining
	return this.each(function() {
	
	  var $this = $(this);
	  var data = $this.data('functionInvocationPlugin');
	  //options is false if option is not an object or doesn't exist
	  var options = typeof option == 'object' && option;
		
	  //only create the plugin for the element if it doesn't already exist
	  //and add a reverse reference to the DOM object
	  if (!data) $this.data('functionInvocationPlugin', new ZF2Tutorial.FunctionInvocationPlugin(this,options));
	  
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
			$.error( 'Function ' +  option + ' does not exist on jQuery.functionInvocationPlugin' );
			
	  }
	  
	});
	
  };
  
  //Plugin Class for plugin
  //See http://stackoverflow.com/questions/10525600/what-is-the-purpose-of-fn-foo-constructor-foo-in-twitter-bootstrap-js
  $.fn.functionInvocationPlugin.Constructor = ZF2Tutorial.FunctionInvocationPlugin;

}( jQuery );