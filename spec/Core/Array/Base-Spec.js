describe("Core / Array / Base.js", function() {

	it("finds the index of an element", function() {
		expect(
			["a", "b", "c"].indexOf("b")
		).toEqual(1);
	});

	it("finds if an element belongs to an array", function() {
		expect(["a", "b", "c"].contains("b")).toBe(true);

		var a = {};
		var b = {};
		var c = {};

		expect([a, b, c].contains(b)).toBe(true);

		expect([a, b, c].contains(new Object())).toBe(false); 
	});

	it("sorts an array of objects using the native sort method", function() {

		var list = [{a: 10}, {a: 20}, {a: 5}, {a: 6}];

		expect(list.nativeSortBy('a')[0].a).toEqual(5);
		expect(list.nativeSortBy('-a')[0].a).toEqual(20);
	});

	it("sorts an array of objects using the bubble sort algorithm", function() {
		var list = [{a: 10}, {a: 20}, {a: 5}, {a: 6}];

		expect(list.bubbleSortBy('a')[0].a).toEqual(5);
		expect(list.bubbleSortBy('-a')[0].a).toEqual(20);
	});

	it("remove elements from an array", function() {
		var list = ["a", "b", "c", "d"];
		expect(list.remove("b").length).toEqual(3);

		list = ["a", "b", "b"];
		expect(list.remove("b").length).toEqual(2);
	});

	it("remove all elements from an array", function() {
		var list = ["a", "b", "b"];
		expect(list.removeAll("b").length).toEqual(1);
	});

	it("generates an array with only the unique elements", function() {
		var list = ["a", "b", "c", "b", "c", "a", "d", "de"];
		expect(list.unique().length).toEqual(5);
	});

	it("adds an element to a list only if the element is not present", function() {
		var list = ["a", "b", "c"];
		expect(list.addUnique("b").length).toEqual(3);
		expect(list.addUnique("d").length).toEqual(4);
	});

	it("pops", function() {
		var list = ["a", "b", "c"];
		expect(list.pop()).toEqual("c");
		expect(list.length).toEqual(2);
	});

	it("loops through each element in the array", function() {
		var list = [1, 2, 3];
		var sum = 0;
		list.each(function(elem) {
			sum += elem;
		});
		expect(sum).toEqual(6);
	});

	it("loops through each element with an index", function() {
		var list = [1, 2, 3];
		var sum = 0;
		list.eachWithIndex(function(elem, index) {
			sum += elem + index;
		});
		expect(sum).toEqual(9);
	});

	it("finds the last element in the array", function() {
		expect([1, 2, 3].last()).toEqual(3);
	});

	it("generates a sub array given boundary", function() {
		var list = [0, 1, 2, 3, 4, 5, 6, 7, 8];

		expect(list.subArray(2, 6).length).toEqual(4);
		expect(list.subArray(4).length).toEqual(4);
	});

	it("generates a sub array given an offset", function() {
		var list = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		expect(list.offsetLeft(2).first()).toEqual(2);
	});

	it("generates a sub array given an offset from the right", function() {
		var list = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		expect(list.offsetRight(2).last()).toEqual(6);
	});

	it("inserts the element at a given index", function() {
		var list = [0, 1, 2, 3];
		expect(list.insertAt(1, 3)[1]).toEqual(3);
	});

	it("inserts the element at first", function() {
		var list = [0, 1, 2, 3];
		expect(list.unshift(9)[0]).toEqual(9);
	});

	it("reverses an array", function() {
		var list = [0, 1, 2, 3];
		expect(list.reverse()[0]).toEqual(3);
	});

});