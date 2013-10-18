describe("Core / String / Base", function() {

    it("isTypeOf", function() {

        expect('array'.isTypeOf([])).toEqual(true);
        expect('number'.isTypeOf(2)).toEqual(true);
        expect('number'.isTypeOf('2')).toEqual(false);
    });

    it("each", function() {

        var sum = 0;
        "1234".each(function(char) {

            sum += +char;
        });
        expect(sum).toEqual(10);
    });

});