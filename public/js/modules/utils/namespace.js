/**
* @fileoverview
* The ZF2Tutorial global namespace object.  If ZF2Tutorial is
* already defined, the existing ZF2Tutorial object will not be overwritten
* so that defined namespaces are preserved.
*
* @author: Andrew Welters (awelters@life-interactive.net)
*
* @static
*/
if (typeof ZF2Tutorial === "undefined") {
    var ZF2Tutorial = {};
}

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

    /**
     * Returns the namespace specified and creates it if it doesn't exist
     * <pre>
     * ZF2Tutorial.namespace("property.package");
     * ZF2Tutorial.namespace("ZF2Tutorial.property.package");
     * </pre>
     * Either of the above create ZF2Tutorial.property, then ZF2Tutorial.property.package
     * <p>
     * Be careful when naming packages. Reserved words may work in some browsers
     * and not others. For instance, the following will fail in Safari:
     * <pre>
     * ZF2Tutorial.namespace("really.long.nested.namespace");
     * </pre>
     * This fails because "long" is a future reserved word in ECMAScript
     * @static
     * @param	{String}	arguments 1-n namespaces to create, optional
     * @return	{Object}	reference to the last namespace object created
    */
    ZF2Tutorial.namespace = function () {
        var a = arguments,
		    aLength,
		    d,
		    dLength,
		    i,
            j,
		    initialJ,
		    o = null;

        // loop cache
        aLength = a.length;
        for (i = 0; i < aLength; i += 1) {
            d = a[i].split(".");
            o = ZF2Tutorial;
            dLength = d.length;

            // ZF2Tutorial is implied, so it is ignored if it is included
            if (d[0] === "ZF2Tutorial") {
                initialJ = 1;
            } else {
                initialJ = 0;
            }
            for (j = initialJ; j < dLength; j += 1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
    };

    ZF2Tutorial.namespace('namespace');

}( jQuery );