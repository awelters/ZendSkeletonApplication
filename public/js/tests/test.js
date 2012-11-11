/**
* @fileoverview
* Test
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
  ZF2Tutorial.namespace("test");
  
  // our test constructor
  ZF2Tutorial.test = function(){
	/**
	* RUN THE TESTS
	*/
	
  };

  //----------------------------------------------------------------------
  // test Start-up
  //----------------------------------------------------------------------

  //runs on when the DOM is fully loaded.
  //SEE http://api.jquery.com/ready/
  $(function () {
	var test = new ZF2Tutorial.test();
  });

}( jQuery );