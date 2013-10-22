;(function(SJsL) {
	'use strict';

	SJsL.A = SJsL.A || {};
	var A = SJsL.A;

	A.average = function(arr) {

		return A.sum(arr) / arr.length;
	}

	A.sum = function(arr) {

		return A.reduce(arr, function(memo, val) {

			return memo + (+val || 0);
		}, 0);
	}

	A.product = function(arr) {

		return A.reduce(arr, function(memo, val) {
			
			return memo * val;
		}, 1);
	}	

	A.max = function(arr) {
		if(arr.length === 0) return void 0;
		if(arr.length === 1) return arr.head;

		return A.reduce(arr, function(a, b) { return b > a ? b : a }, A.head(arr));
	}

	A.min = function(arr) {
		if(arr.length === 0) return void 0;
		if(arr.length === 1) return arr.head;

		return A.reduce(arr, function(a, b) { return b > a ? a : b }, A.head(arr));
	}

})(SJsL);