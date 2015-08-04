'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log;


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
	var lvar = ln( 1 - p ) - 2 * ln( p );
	return exp( lvar );
} // end FUNCTION variance()


// EXPORTS

module.exports =  variance;
