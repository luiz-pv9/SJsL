describe("Core / Array / Base.js", function() {


	it("indexOf", function() {
		expect([1,2,3].indexOf(3)).toEqual(2);
		expect(["a", "b", "c"].indexOf("d")).toEqual(-1);
		expect([].indexOf('c')).toEqual(-1);
	});

	it("contains", function() {
		expect([1,2,3].contains(3)).toEqual(true);
		expect(["a", "b", "c"].contains("d")).toEqual(false);
	});

	it("remove", function() {
		expect([1,2,3].remove(2)[1]).toEqual(3);
		expect([1,2,3].remove(2).length).toEqual(2);
		expect([1,2,3].remove(5).length).toEqual(3);
	});

	it("removeAll", function() {
		expect([1,2,3,2].removeAll(2).length).toEqual(2);
		expect([1,2,3,2,2,2].removeAll(2).length).toEqual(2);
	});

	it("unique", function() {
		expect([1,2,3,2,4].unique()).toEqual([1,2,3,4]);
		expect(["a", "b", "b", "a", "b"].unique().length).toEqual(2);
		// faster algorithm
		expect([1,2,2,3,3,3,4,5,5].unique(true)).toEqual([1,2,3,4,5]);
	});

	it("addUnique", function() {
		expect([1,2,3].addUnique(3).length).toEqual(3);
		expect([1,2,3].addUnique(4).length).toEqual(4);
	});

	it("pop/drop", function() {
		var list = [1,2,3];
		expect(list.pop()).toEqual(3);
		expect(list.length).toEqual(2);
	});


	it("each", function() {
		var i = 0;
		[1,2,3,4].each(function(n) {
			i += n;
		});
		expect(i).toEqual(10);
	});

	it("eachWithIndex", function() {
		var sum = 0;
		// 1 * 0 = 0 
		// 2 * 1 = 2 +
		// 3 * 2 = 6 +
		//        ---
		//         8
		[1,2,3].each(function(n, i) {
			sum += n * i;
		});
		expect(sum).toEqual(8);
	});

	it("last", function() {
		expect(["a", "b", "c"].last()).toEqual("c");
	});

	it("tail", function() {
		expect([1,2,3,4].tail().length).toEqual(3);
		expect([1,2,3,4].tail().tail().length).toEqual(2);
	});

	it("head/first", function() {
		expect([1,2,3].head()).toEqual(1);
	});

	it("subArray", function() {
		//      0 1 2 3 4
		expect([1,2,3,4,5].subArray(1, 3).last()).toEqual(4);
	});

	it("offsetLeft/offsetTop", function() {
		expect([1,2,3,4,5].offsetLeft(2).head()).toEqual(3);
	});

	it("offsetRight/offsetBottom", function() {
		expect([1,2,3,4,5].offsetRight(2).last()).toEqual(3);
	});

	it("insertAt", function() {
		var list = [1,2,3,4];
		list.insertAt(1, 9);
		expect(list[1]).toEqual(9);
	});

	it("unshift", function() {
		var list = [1,2,3,4];
		expect(list.unshift(9).head()).toEqual(9);
	});

	it("reverse", function() {
		expect([1,2,3,4].reverse().head()).toEqual(4);
	});

	it("removeAt", function() {
		expect([1,2,3,4].removeAt(1)).toEqual(2);

		var list = [1,2,3,4,5];
		list.removeAt(2);
		expect(list[2]).toEqual(4);
	});

});