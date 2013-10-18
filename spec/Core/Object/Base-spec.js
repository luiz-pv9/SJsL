describe("Core / Object / Base", function() {


	it("keys", function() {

		var obj = {a: 10, b: 20, c: 30};
		expect(obj.keys().length).toEqual(3);
		expect(obj.keys().head()).toEqual('a');

	});

	it("shallowClone", function() {

		var obj = {
			a: 10,
			b: 20,
			c: {
				d: 30
			}
		};

		expect(obj.shallowClone()).not.toBe(obj);

		// Copy nested objects and array by reference
		expect(obj.shallowClone().c).toBe(obj.c);
	});

	it("deepClone", function() {


		var obj = {
			a: 10,
			b: 20,
			c: {
				d: 30
			}
		};

		expect(obj.deepClone()).not.toBe(obj);

		// copy all nested objects and arrays
		expect(obj.deepClone().c).not.toBe(obj.c);
	});

	it("removeAttribute", function() {

		var obj = {a: 20, b: 10};
		expect(obj.keys().length).toEqual(2);
		obj.removeAttribute("b");
		expect(obj.keys().length).toEqual(1);
		expect(obj.b).toBe(void 0);
	});

	it("removeAttributes", function() {

		var obj = {a: 20, b: 10, c: 30, d: 40};
		expect(obj.keys().length).toEqual(4);

		// Passing an array
		obj.removeAttributes(['a', 'b']);
		expect(obj.keys().length).toEqual(2);
		obj.a = 20;
		obj.b = 10;
		expect(obj.keys().length).toEqual(4);

		// Passing separate arguments
		obj.removeAttributes("a", "b");
		expect(obj.keys().length).toEqual(2);
	});

	it("allowAttributes", function() {

		var obj = {a: 20, b: 10, c: 30, d: 40};

		// List of arguments
		obj.allowAttributes('a', 'b', 'd');
		expect(obj.keys().length).toEqual(3);
		expect(obj.c).toEqual(void 0);
		obj = {a: 20, b: 10, c: 30, d: 40};

		// Array of objects
		obj.allowAttributes(['a', 'b', 'd']);

		expect(obj.keys().length).toEqual(3);
		expect(obj.c).toEqual(void 0);
	});
});
