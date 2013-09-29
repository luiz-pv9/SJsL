;(function(SJsL) {
	'use strict';

	// Implementing the indexOf function if it doesn't exists
	// Comparision happens with triple equal sign
	// Returns -1 if it doesn't find the element
	if(SJsL.typeOf(Array.prototype.indexOf) === "Undefined") {
		Array.prototype.indexOf = function(e) {
			for(var i=0, len=this.length; i<len; i++) {
				if(this[i] === e) return i;
			}
			return -1;
		}
	}

	// Returns true if the element is in the array, false otherwise
	Array.prototype.contains = function(e) {
		return this.indexOf(e) !== -1;
	}

	// Runs the native javascript sortBy - it changes the original array!!
	// Parameter (attr) is the attribute to sort the array by.
	// If a minus sign ("-") is passed in fron of the attribute - for example "-name",
	// the array will be sorted in reverse order by the name
	Array.prototype.nativeSortBy = function(attr) {
		var dynamicSort = function(attr) {
			var sortOrder = 1;
			if(attr[0] === "-") {
				sortOrder = -1;
				attr = attr.substr(1, attr.length - 1);
			}
			return function (a, b) {
				var result = (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0;
				return result * sortOrder;
			}
		}
		return this.sort(dynamicSort(attr)); 
	}

	// Runs a bubble sort algorithm to sort the array
	Array.prototype.bubbleSortBy = function(attr) {

		var reverse = (attr.indexOf("-") === 0);

		var len=this.length, i, j, stop, temp;

		if(reverse) {

			attr = attr.substr(1, attr.length - 1);

			for(i=0; i<len; i++) {
				for(j=0, stop=len-i-1; j<stop; j++) {
					if(this[j][attr] < this[j+1][attr]) {
						temp = this[j];
						this[j] = this[j+1];
						this[j+1] = temp;
					}
				}
			}

		} else {

			for(i=0; i<len; i++) {
				for(j=0, stop=len-i-1; j<stop; j++) {
					if(this[j][attr] > this[j+1][attr]) {
						temp = this[j];
						this[j] = this[j+1];
						this[j+1] = temp;
					}
				}
			}

		}

		return this; 
	}

	Array.prototype.remove = function(e) {
		this.splice(this.indexOf(e), 1); 	
		return this;
	}

	Array.prototype.removeAll = function(e) {
		while(this.contains(e)) {
			this.remove(e);
		}
		return this;
	}

	// Returns a new array with only the unique elements in this array
	// If sorted is passed, a much faster algorith runs.
	Array.prototype.unique = function(sorted) {
		var list = [];
		if(sorted) {
			this.each(function(e) {
				if(list.last !== e) { list.push(e); }
			});
		} else {
			this.each(function(e) {
				if(!list.contains(e)) { list.push(e); }
			});
		}
		return list;
	}

	// Adds the element in the array if it doesn't already belongs to it
	Array.prototype.addUnique = function(e) {
		if(!this.contains(e)) this.push(e);
		return this;
	}

	Array.prototype.quickSort = function() {
	}

	// Returns the last element from the array and remove it
	Array.prototype.pop = function() {
		return this.splice(this.length-1, 1)[0];
	}

	Array.prototype.drop = Array.prototype.pop;

	// For each element in the array, calls the function passed with the next element
	Array.prototype.each = function(fn) {
		for(var i=0, len=this.length; i<len; i++) {
			fn(this[i]);
		}
	}

	// Same as each, but calls the function with a second parameter - the index of the element
	Array.prototype.eachWithIndex = function(fn) {
		for(var i=0, len=this.length; i<len; i++) {
			fn(this[i], i);
		}
	}

	// Returns the lsat element in the array
	Array.prototype.last = function() {
		return this[this.length-1];
	}



	// Given an array with N elements, this function returns the last N-1 elements
	Array.prototype.tail = function() {
		if(this.length === 0) return [];
		if(this.length === 1) return this.slice(1);
		return this.slice(1, this.length);
	}

	// Returns the first element
	Array.prototype.head = function() {
		return this[0];
	}

	Array.prototype.first = Array.prototype.head;

	Array.prototype.subArray = function(start, end) {
		var subArray = [];

		if(!end) {
			end = start;
			start = 0;
		}

		for(; start < end; start++) {
			subArray.push(this[start]);
		}

		return subArray;
	}

	Array.prototype.offsetLeft = function(offset) {
		return this.subArray(offset, this.length);
	}

	Array.prototype.offsetRight = function(offset) {
		return this.subArray(0, this.length - offset);
	}

	Array.prototype.offsetBottom = Array.prototype.offsetRight;
	Array.prototype.offsetTop = Array.prototype.offsetLeft;

	Array.prototype.insertAt = function(index, e) {
		this.splice(index, 0, e);
		return this;
	}

	Array.prototype.unshift = function(e) {
		return this.insertAt(0, e);
	}

	Array.prototype.reverse = function() {
		return this.reduce(function(memo, val) {
			return memo.unshift(val);
		}, []);
	}


})(window.SJsL);