describe("Core / Object / Base", function() {

	var O = SJsL.O;

	it("keys", function() {

		var obj = {a: 10, b: 20, c: 30};
		expect(O.keys(obj).length).toEqual(3);
		expect(O.keys(obj)[0]).toEqual('a');

	});

	it("removeAttribute", function() {

		var obj = {a: 20, b: 10};
		expect(O.keys(obj).length).toEqual(2);
		O.removeAttribute(obj, 'b');
		expect(O.keys(obj).length).toEqual(1);
		expect(obj.b).toBe(void 0);
	});

	it("removeAttributes", function() {

		var obj = {a: 20, b: 10, c: 30, d: 40};
		expect(O.keys(obj).length).toEqual(4);

		// Passing an array
		O.removeAttributes(obj, ['a', 'b']);
		expect(O.keys(obj).length).toEqual(2);
		obj.a = 20;
		obj.b = 10;
		expect(O.keys(obj).length).toEqual(4);

		// Passing separate arguments
		O.removeAttributes(obj, 'a', 'b');
		expect(O.keys(obj).length).toEqual(2);
	});

	it("allowAttributes", function() {

		var obj = {a: 20, b: 10, c: 30, d: 40};


		// List of arguments
		O.allowAttributes(obj, 'a', 'b', 'd');
		expect(O.keys(obj).length).toEqual(3);
		expect(obj.c).toEqual(void 0);
		obj = {a: 20, b: 10, c: 30, d: 40};

		// Array of objects
		O.allowAttributes(obj, ['a', 'b', 'd']);
		expect(O.keys(obj).length).toEqual(3);
		expect(obj.c).toEqual(void 0);
	});

	it("doesnt work with other objects other than the native", function() {

		// Actually, it works...
		// Since everything inherits from 'Object'

		// Maybe, JUST MAYBE, the functions that change the native objects
		// should be abstracted to another object container (like underscore
		// and jQuery)
	});
});
