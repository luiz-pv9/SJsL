describe("Core / Array / Math", function() {

	var A = SJsL.A;

	it("average", function() {
		expect(A.average([1,2,3,4])).toEqual(2.5);
	});

	it("sum", function() {
		expect(A.sum([1,2,3,4])).toEqual(10);
	});

	it("product", function() {
		expect(A.product([2,2,3])).toEqual(12);
	});

	it("max", function() {
		expect(A.max([1,2,5,3,4])).toEqual(5);
	});

	it("min", function() {
		expect(A.min([4,2,3,1,4])).toEqual(1);
	});

});