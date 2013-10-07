describe("Core / Number / Date", function() {

    it("days", function() {

        var today = Date.today();

        expect((2).days().ahead()).toEqual(today.add(2).days());
        expect((3).days().ago()).toEqual(today.add(-3).days());

    });

    it("months", function() {

        var today = Date.today();
        expect((2).months().ahead()).toEqual(today.add(2).months());
        expect((7).months().ago()).toEqual(today.add(-7).months());
    });

    it("years", function() {

        var today = Date.today();
        expect((2).years().ahead()).toEqual(today.add(2).years());
        expect((7).years().ago()).toEqual(today.add(-7).years());
    });

});