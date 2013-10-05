;(function(SJsL) {
	'use strict';

	// --
	// All those functions work with an array of objects
	// --

	// Given an attribute, returns an array with all the values extracted from the objects
	Array.prototype.pluck = function(attr) {

		return this.map(function(e) {

			return e[attr];
		});
	}

	// For each element in the array, the function passed is called and the return value
	// for that function is sotered in another array, and the new array is returned
	Array.prototype.map = function(fn) {

		var list = [];
		this.each(function(e) {

			list.push(fn(e));
		})
		return list;
	}

	Array.prototype.foldLeft = function(fn, memo) {

		this.each(function(e) {

			memo = fn(memo, e);
		});
		return memo;
	}

	Array.prototype.reduce = Array.prototype.foldLeft;

	Array.prototype.search = function(fn) {

		var list = [];
		this.each(function(e) {

			if(fn(e)) {

				list.push(e);
			}
		});
		return list;
	}

	Array.prototype.filter = Array.prototype.search;

	Array.prototype.outNested = function(attr) {

		var obj = {};
		this.each(function(e) {

			obj[e[attr]] = obj[e[attr]] || [];
			obj[e[attr]].push(e);
		})
		return obj;
	}
	
	// Runs the native javascript sortBy - it changes the original array!!
	// Parameter (attr) is the attribute to sort the array by.
	// If a minus sign ("-") is passed in fron of the attribute - for example "-name",
	// the array will be sorted in reverse order by the attribute
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

		var list = this.deepClone();
		var reverse = (attr.indexOf("-") === 0);
		var len = list.length, i, j, stop, temp;

		if(reverse) {

			attr = attr.substr(1, attr.length - 1);
			for(i=0; i<len; i++) {

				for(j=0, stop=len-i-1; j<stop; j++) {

					if(list[j][attr] < list[j+1][attr]) {

						temp = list[j];
						list[j] = list[j+1];
						list[j+1] = temp;
					}
				}
			}

		}
		else {

			for(i=0; i<len; i++) {

				for(j=0, stop=len-i-1; j<stop; j++) {

					if(list[j][attr] > list[j+1][attr]) {

						temp = list[j];
						list[j] = list[j+1];
						list[j+1] = temp;
					}
				}
			}
		}
		return list; 
	}

})(window.SJsL);