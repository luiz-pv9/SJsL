describe("Core / Array / Math", function() {

	it("finds the sum of all the elements in the array", function() {
		var list = [1, 2, 3];
		expect(list.sum()).toEqual(6);
	});

	it("finds the average of all elements in the array", function() {
		var list = [1, 2, 3, 4];
		expect(list.average()).toEqual(2.5);
	});

	it("finds the max value in the array", function() {
		var list = [1, 2, 3, 4];
		expect(list.max()).toEqual(4);
	});

	it("finds the min value in the array", function() {
		var list = [1, 3, 5, 3, -1, 5];
		expect(list.min()).toEqual(-1);
	});

	it("finds the product of all elements in the array", function() {
		var list = [1, 2, 3, 2];
		expect(list.product()).toEqual(12);
	});

});