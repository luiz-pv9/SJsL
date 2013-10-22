;(function(SJsL) {
	'use strict';

	SJsL.A = {};
	var A = SJsL.A;

	// Implementing the indexOf function if it doesn't exists
	// Comparision happens with triple equal sign
	// Returns -1 if it doesn't find the element
	A.indexOf = function(arr, e) {

		if(SJsL.isUndefined(Array.prototype.indexOf)) {
			for(var i=0, len=arr.length; i<len; i++) {

				if(arr[i] === e) return i;
			}
			return -1;
		}
		return arr.indexOf(e);
	}

	// Returns true if the element is in the array, false otherwise
	A.contains = function(arr, e) {

		return A.indexOf(arr, e) !== -1;
	}

	A.remove = function(arr, e) {

		if(A.contains(arr, e)) {
			arr.splice(A.indexOf(arr, e), 1); 	
		}
		return arr;
	}

	A.removeAt = function(arr, index) {

		return arr.splice(index, 1)[0];
	}

	A.removeAll = function(arr, e) {

		while(A.contains(arr, e)) {

			A.remove(arr, e);
		}
		return arr;
	}
	
	// Returns a new array with only the unique elements in this array
	// If sorted is passed, a much faster algorith runs.
	A.unique = function(arr, sorted) {

		var list = [];
		if(sorted) {

			A.each(arr, function(e) {

				if(A.last(list) !== e) { list.push(e); }
			});
		}
		else {

			A.each(arr, function(e) {

				if(!A.contains(list, e)) { list.push(e); }
			});
		}
		return list;
	}

	// Adds the element in the array if it doesn't already belongs to it
	A.addUnique = function(arr, e) {

		if(!A.contains(arr, e)) arr.push(e);
		return arr;
	}

	A.quickSort = function() {
		// TODO
	}

	// Returns the last element from the array and remove it
	A.pop = function(arr) {

		return arr.splice(this.length-1, 1)[0];
	}

	A.drop = A.pop;

	// For each element in the array, calls the function passed with the next element
	A.each = function(arr, fn) {

		for(var i=0, len=arr.length; i<len; i++) {

			fn(arr[i], i);
		}
	}

	// Returns the lsat element in the array
	A.last = function(arr) {
		if(arr.length === 0) return void 0;
		return arr[arr.length-1];
	}

	// Given an array with N elements, this function returns the last N-1 elements
	A.tail = function(arr) {

		if(arr.length === 0) return [];
		if(arr.length === 1) return arr.slice(1);
		return arr.slice(1, arr.length);
	}

	// Returns the first element
	A.head = function(arr) {

		if(arr.length === 0) return void 0;
		return arr[0];
	}

	A.first = A.head;

	A.subArray = function(arr, start, end) {

		var subArray = [];
		if(!end) {

			end = start;
			start = 0;
		}

		for(; start <= end; start++) {

			subArray.push(arr[start]);
		}

		return subArray;
	}

	A.offsetLeft = function(arr, offset) {

		return A.subArray(arr, offset, arr.length);
	}

	A.offsetRight = function(arr, offset) {

		return A.subArray(arr, 0, (arr.length - 1) - offset);
	}

	A.offsetBottom = A.offsetRight;
	A.offsetTop = A.offsetLeft;

	A.insertAt = function(arr, index, e) {

		arr.splice(index, 0, e);
		return arr;
	}

	A.unshift = function(arr, e) {

		return A.insertAt(arr, 0, e);
	}

	A.reverse = function(arr) {

		return A.reduce(arr, function(memo, val) {
			
			return A.unshift(memo, val);
		}, []);
	}

})(SJsL);
