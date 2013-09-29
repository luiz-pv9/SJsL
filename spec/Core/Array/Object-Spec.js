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

	it("filters the array", function() {
		var arr = array.filter(function(e) {
			return e.a > 10;
		});

		expect(arr.length).toEqual(2);
	});

	it("groups by a value of the object in the array", function() {
		var list = [
			{group: 'a', ni: 10},
			{group: 'b', ni: 15},
			{group: 'b', ni: 20},
			{group: 'a', ni: 20}
		];
		
		expect(list.outNested('group').a.length).toEqual(2);
	});

});