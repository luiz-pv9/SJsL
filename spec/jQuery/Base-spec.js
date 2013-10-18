describe("jQuery integration", function() {

    it("works without conflicting with jQuery", function() {

        expect($('body')[0]).toBeTruthy();
    });

});