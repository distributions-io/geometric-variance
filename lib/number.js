'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// VARIANCE //

/**
* FUNCTION variance( p )
*	Computes the distribution variance for a Geometric distribution with parameter p.
*
* @param {Number} p - success probability
* @returns {Number} distribution variance
*/
function variance( p ) {
	if ( !( isNumber(p) && 0 <= p && p <= 1) ) {
		return NaN;
	}
	return ( 1 - p ) / pow( p, 2 );
} // end FUNCTION variance()


// EXPORTS

module.exports =  variance;
