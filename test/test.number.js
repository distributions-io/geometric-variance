/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	variance = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number variance', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the distribution variance', function test() {
		assert.closeTo( variance( 0.2 ), 20, 1e-5 );
		assert.closeTo( variance( 0.4  ), 3.75, 1e-5 );
		assert.closeTo( variance( 0.6  ), 10/9, 1e-5 );
		assert.closeTo( variance( 0.8  ), 0.3125, 1e-5 );
	});

	it( 'should return `NaN` for invalid values of parameter p', function test() {
		assert.isTrue( isnan( variance( -1 ) ) );
		assert.isTrue( isnan( variance( 2 ) ) );
	});

});
