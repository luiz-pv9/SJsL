describe("Core / Array / Math", function() {

	it("average", function() {
		expect([1,2,3,4].average()).toEqual(2.5);
	});

	it("sum", function() {
		expect([1,2,3,4].sum()).toEqual(10);
	});

	it("product", function() {
		expect([2,2,3].product()).toEqual(12);
	});

	it("max", function() {
		expect([1,2,5,3,4].max()).toEqual(5);
	});

	it("min", function() {
		expect([4,2,3,1,4].min()).toEqual(1);
	});

});