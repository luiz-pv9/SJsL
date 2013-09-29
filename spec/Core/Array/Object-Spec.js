describe("Core / Array / Object", function() {

	var array = null;

	beforeEach(function() {
		array = [
			{a: 10, b: 20},
			{a: 15, b: 25},
			{a: 25, b: 24},
			{a: 5,  b: 19},
			{a: 7,  b: 22}
		];
	});

	it("plucks an array", function() {
		expect(array.pluck('a')[0]).toEqual(10);
		expect(array.pluck('b')[0]).toEqual(20);
	});

	it("maps through the array", function() {
		var arr = array.map(function(e) {
			return {c: (e.a * 2)};
		});
		expect(arr[0].c).toEqual(20);
	});

});