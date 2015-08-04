/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	variance = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array variance', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the distribution variance', function test() {
		var p, actual, expected;

		p = new Float64Array( [ 0.2, 0.4, 0.6, 0.8  ] );
		actual = new Float64Array( p.length );

		actual = variance( actual, p );
		expected = new Float64Array( [ 20, 3.75, 10/9, 0.3125 ] );

		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( variance( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
