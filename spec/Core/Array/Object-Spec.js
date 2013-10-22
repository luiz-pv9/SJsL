describe("Core / Array / Object", function() {

	var array = null;
	var A = SJsL.A;

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

		expect(A.pluck(array, 'a')[0]).toEqual(10);
		expect(A.pluck(array, 'b')[0]).toEqual(20);
	});

	it("map", function() {
		var arr = A.map(array, function(e) {
			return {c: e.a * e.b};
		});
		expect(arr[0].c).toEqual(200);
	});

	it("find", function() {

		var entry = SJsL.A.find(array, function(e) {
			return e.a === 15;
		});

		expect(entry.b).toEqual(25);
	});

	it("foldLeft/reduce", function() {

		var max = A.reduce(array, function(memo, val) {
			return memo > val.a ? memo : val.a;			
		}, array[0].a);

		expect(max).toEqual(25);
	});

	it("search/filter", function() {
		var arr = A.search(array, function(e) {
			return e.a > 10;
		});

		expect(arr.length).toEqual(2);
	});

	it("outNested", function() {
		var obj = A.outNested(array, 'group');
		expect(obj['A'].length).toEqual(2);
		expect(obj['C'].length).toEqual(1);
	});

	it("nativeSortBy", function() {
		A.nativeSortBy(array, 'a');
		expect(array[0].a).toEqual(5);
		A.nativeSortBy(array, '-a');
		expect(array[0].a).toEqual(25);
	});

	it("bubbleSortBy", function() {

		console.log(SJsL.deepCloneObject({a: 10, b: {c: 10}}));
		console.log(SJsL.deepClone({a: 10}));

		var arr = A.bubbleSortBy(array, 'a');
		expect(arr[0].a).toEqual(5);
		// Doesn't modify the original
		expect(array[0].a).toEqual(10);

		arr = A.bubbleSortBy(array, '-a');
		expect(arr[0].a).toEqual(25);
		// Doesn't modify the original
		expect(array[0].a).toEqual(10);
	});

});