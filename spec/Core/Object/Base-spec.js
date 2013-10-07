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
});