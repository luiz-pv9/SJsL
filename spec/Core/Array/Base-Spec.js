describe("Core / Array / Base.js", function() {

	var A = SJsL.A;

	it("indexOf", function() {
		expect(A.indexOf([1,2,3], 3)).toEqual(2);
		expect(A.indexOf(["a", "b", "c"], "d")).toEqual(-1);
		expect(A.indexOf([], 'c')).toEqual(-1);
	});

	it("contains", function() {
		expect(A.contains([1,2,3], 3)).toEqual(true);
		expect(A.contains(["a", "b", "c"], "d")).toEqual(false);
	});

	it("remove", function() {
		expect(A.remove([1,2,3], 2)[1]).toEqual(3);
		expect(A.remove([1,2,3], 2).length).toEqual(2);
		expect(A.remove([1,2,3], 5).length).toEqual(3);
	});

	it("removeAll", function() {
		expect(A.removeAll([1,2,3,2], 2).length).toEqual(2);
		expect(A.removeAll([1,2,3,2,2,2], 2).length).toEqual(2);
	});

	it("unique", function() {
		expect(A.unique([1,2,3,2,4])).toEqual([1,2,3,4]);
		expect(A.unique(["a", "b", "b", "a", "b"]).length).toEqual(2);
		// faster algorithm
		expect(A.unique([1,2,2,3,3,3,4,5,5], true)).toEqual([1,2,3,4,5]);
	});

	it("addUnique", function() {
		expect(A.addUnique([1,2,3], 3).length).toEqual(3);
		expect(A.addUnique([1,2,3], 4).length).toEqual(4);
	});

	it("pop/drop", function() {
		var list = [1,2,3];
		expect(list.pop()).toEqual(3);
		expect(list.length).toEqual(2);
	});


	it("each", function() {
		var i = 0;
		A.each([1,2,3,4], function(n) {
			i += n;
		});
		expect(i).toEqual(10);
	});

	it("each - with index", function() {
		var sum = 0;
		// 1 * 0 = 0 
		// 2 * 1 = 2 +
		// 3 * 2 = 6 +
		//        ---
		//         8
		A.each([1,2,3], function(n, i) {
			sum += n * i;
		});
		expect(sum).toEqual(8);
	});

	it("last", function() {
		expect(A.last(["a", "b", "c"])).toEqual("c");
	});

	it("tail", function() {
		expect(A.tail([1,2,3,4]).length).toEqual(3);
		expect(A.tail(A.tail([1,2,3,4])).length).toEqual(2);
	});

	it("head/first", function() {
		expect(A.head([1,2,3])).toEqual(1);
	});

	it("subArray", function() {
		//                 0 1 2 3 4
		expect(A.subArray([1,2,3,4,5], 1, 3)[0]).toEqual(2);
	});

	it("offsetLeft/offsetTop", function() {
		expect(A.offsetLeft([1,2,3,4,5], 2)[0]).toEqual(3);
	});

	it("offsetRight/offsetBottom", function() {
		expect(A.last(A.offsetRight([1,2,3,4,5], 2))).toEqual(3);
	});

	it("insertAt", function() {
		var list = [1,2,3,4];
		A.insertAt(list, 1, 9);
		expect(list[1]).toEqual(9);
	});

	it("unshift", function() {
		var list = [1,2,3,4];
		expect(A.unshift(list, 9)[0]).toEqual(9);
	});

	it("reverse", function() {
		expect(A.reverse([1,2,3,4])[0]).toEqual(4);
	});

	it("removeAt", function() {
		expect(A.removeAt([1,2,3,4], 1)).toEqual(2);

		var list = [1,2,3,4,5];
		A.removeAt(list, 2);
		expect(list[2]).toEqual(4);
	});

});