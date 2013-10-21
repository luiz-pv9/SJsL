describe("Core / Object / Base", function() {


	it("keys", function() {

		var obj = {a: 10, b: 20, c: 30};
		expect(SJsL.keys(obj).length).toEqual(3);
		expect(SJsL.keys(obj).head()).toEqual('a');

	});

	it("removeAttribute", function() {

		var obj = {a: 20, b: 10};
		expect(SJsL.keys(obj).length).toEqual(2);
		SJsL.removeAttribute(obj, 'b');
		expect(SJsL.keys(obj).length).toEqual(1);
		expect(obj.b).toBe(void 0);
	});

	it("removeAttributes", function() {

		var obj = {a: 20, b: 10, c: 30, d: 40};
		expect(SJsL.keys(obj).length).toEqual(4);

		// Passing an array
		SJsL.removeAttributes(obj, ['a', 'b']);
		expect(SJsL.keys(obj).length).toEqual(2);
		obj.a = 20;
		obj.b = 10;
		expect(SJsL.keys(obj).length).toEqual(4);

		// Passing separate arguments
		SJsL.removeAttributes(obj, 'a', 'b');
		expect(SJsL.keys(obj).length).toEqual(2);
	});

	it("allowAttributes", function() {

		var obj = {a: 20, b: 10, c: 30, d: 40};


		// List of arguments
		SJsL.allowAttributes(obj, 'a', 'b', 'd');
		expect(SJsL.keys(obj).length).toEqual(3);
		expect(obj.c).toEqual(void 0);
		obj = {a: 20, b: 10, c: 30, d: 40};

		// Array of objects
		SJsL.allowAttributes(obj, ['a', 'b', 'd']);
		expect(SJsL.keys(obj).length).toEqual(3);
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
