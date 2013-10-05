describe("Core / Array / Object", function() {

	var array = null;

	beforeEach(function() {
		array = [
			{a: 10, b: 20, group: 'A'},
			{a: 15, b: 25, group: 'B'},
			{a: 25, b: 24, group: 'A'},
			{a: 5,  b: 19, group: 'C'},
			{a: 7,  b: 22, group: 'B'}
		];
	});

	it("pluck", function() {

		expect(array.pluck('a').head()).toEqual(10);
		expect(array.pluck('b').last()).toEqual(22);
	});

	it("map", function() {
		var arr = array.map(function(e) {
			return {c: e.a * e.b};
		});
		expect(arr.head().c).toEqual(200);
	});

	it("foldLeft/reduce", function() {

		var max = array.foldLeft(function(memo, val) {
			return memo > val.a ? memo : val.a;			
		}, array.head().a);

		expect(max).toEqual(25);
	});

	it("search/filter", function() {
		var arr = array.search(function(e) {
			return e.a > 10;
		});

		expect(arr.length).toEqual(2);
	});

	it("outNested", function() {
		var obj = array.outNested('group');
		expect(obj['A'].length).toEqual(2);
		expect(obj['C'].length).toEqual(1);
	});

	it("nativeSortBy", function() {
		array.nativeSortBy('a');
		expect(array[0].a).toEqual(5);
		array.nativeSortBy('-a');
		expect(array[0].a).toEqual(25);
	});

	it("bubbleSortBy", function() {
		var arr = array.bubbleSortBy('a');
		expect(arr[0].a).toEqual(5);
		// Doesn't modify the original
		expect(array[0].a).toEqual(10);

		arr = array.bubbleSortBy('-a');
		expect(arr[0].a).toEqual(25);
		// Doesn't modify the original
		expect(array[0].a).toEqual(10);
	});

});