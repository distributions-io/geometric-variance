Variance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Geometric](https://en.wikipedia.org/wiki/Geometric_distribution) distribution [variance](https://en.wikipedia.org/wiki/variance).

The [variance](https://en.wikipedia.org/wiki/variance) for a [Geometric](https://en.wikipedia.org/wiki/Geometric_distribution) random variable is

<div class="equation" align="center" data-raw-text="\operatorname{Var}\left[ X \right] = " data-equation="eq:variance">
	<img src="" alt="variance for a Geometric distribution.">
	<br>
</div>

where `p` is the success probability.


## Installation

``` bash
$ npm install distributions-geometric-variance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var variance = require( 'distributions-geometric-variance' );
```

#### variance( p[, opts] )

Computes the [variance](https://en.wikipedia.org/wiki/variance) for a [Geometric](https://en.wikipedia.org/wiki/Geometric_distribution) distribution with parameter `p` . `p` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = variance( 0.2 );
// returns 20

p = [ 0.2, 0.4, 0.6, 0.8 ];
out = variance( p );
// returns [ 20, 3.75, 10/9, 0.3125 ]

p = new Float32ArrayArray( p );
out = variance( p );
// returns Float64Array( [20,3.75,10/9,0.3125] )

p =  matrix( [ 0.2, 0.4, 0.6, 0.8 ], [2,2] );
/*
	[ 0.2, 0.4,
	  0.6, 0.8 ]
*/

out = variance( p );
/*
	[ 20, 3.75,
	  10/9, 0.3125 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var p = [
	[0,0.2],
	[1,0.4],
	[2,0.6],
	[3,0.8]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = variance( p, {
	'accessor': getValue
});
// returns [ 20, 3.75, 10/9, 0.3125 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var p = [
	{'x':[9,0.2]},
	{'x':[9,0.4]},
	{'x':[9,0.6]},
	{'x':[9,0.8]}
];

var out = variance( p, 'x|1', '|' );
/*
	[
		{'x':[9,20]},
		{'x':[9,3.75]},
		{'x':[9,10/9]},
		{'x':[9,0.3125]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var p, out;

p = new Float64Array( [ 0.2,0.4,0.6,0.8 ] );

out = variance( p, {
	'dtype': 'int32'
});
// returns Int32Array( [ 20,3,NaN,0 ] )

// Works for plain arrays, as well...
out = variance( [0.2,0.4,0.6,0.8], {
	'dtype': 'int32'
});
// returns Int32Array( [ 20,3,NaN,0 ] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var p,
	bool,
	mat,
	out,
	i;

p = [ 0.2, 0.4, 0.6, 0.8 ];

out = variance( p, {
	'copy': false
});
// returns [ 20, 3.75, 10/9, 0.3125 ]

bool = ( data === out );
// returns true

mat = matrix( [ 0.2, 0.4, 0.6, 0.8 ], [2,2] );
/*
	[ 0.2, 0.4,
	  0.6, 0.8 ]
*/

out = variance( mat, {
	'copy': false
});
/*
	[ 20, 3.75,
	  10/9, 0.3125 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a positive number, the [expected value](https://en.wikipedia.org/wiki/Expected_value) is `NaN`.

	``` javascript
	var p, out;

	out = variance( -1 );
	// returns NaN

	out = variance( 0 );
	// returns NaN

	out = variance( null );
	// returns NaN

	out = variance( true );
	// returns NaN

	out = variance( {'a':'b'} );
	// returns NaN

	out = variance( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	p = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = variance( p, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = variance( p, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = variance( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	variance = require( 'distributions-geometric-variance' );

var p,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
p = new Array( 10 );
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = i;
}
out = variance( p );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = {
		'x': p[ i ]
	};
}
out = variance( p, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = {
		'x': [ i, p[ i ].x ]
	};
}
out = variance( p, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
p = new Int32Array( 10 );
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = i;
}
out = variance( p );

// Matrices...
mat = matrix( p, [5,2], 'int32' );
out = variance( mat );

// Matrices (custom output data type)...
out = variance( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-geometric-variance.svg
[npm-url]: https://npmjs.org/package/distributions-geometric-variance

[travis-image]: http://img.shields.io/travis/distributions-io/geometric-variance/master.svg
[travis-url]: https://travis-ci.org/distributions-io/geometric-variance

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/geometric-variance/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/geometric-variance?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/geometric-variance.svg
[dependencies-url]: https://david-dm.org/distributions-io/geometric-variance

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/geometric-variance.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/geometric-variance

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/geometric-variance.svg
[github-issues-url]: https://github.com/distributions-io/geometric-variance/issues
