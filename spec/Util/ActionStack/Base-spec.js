describe("Util / ActionStack / Base", function() {

    var actionStack = null;
    beforeEach(function() {

        actionStack = new SJsL.ActionStack("carlsen");
    });

    it("exists", function() {

        expect(actionStack).toBeTruthy();
    });

    it("has default actions", function() {

        expect(actionStack.actions).toBeTruthy();
    });

    it("instantiates a default action", function() {

        expect(actionStack.actions["changeTextValue"]()).toBeTruthy();
    });

    describe("Actions", function() {


        it("changeTextValue", function() {

            var action = actionStack.actions["changeTextValue"]("Anand");
            actionStack.addAction(action);
            expect(actionStack.undo()).toEqual("Anand");
        });

        it("change object property", function() {

            var dog = {name: "Rex", age: 12};

            var action = actionStack.actions["changeObjectProperty"](dog);
            actionStack.addAction(action);

            dog.name = "Hox";

            expect(actionStack.undo()).toEqual({name: "Rex"});
        });

        it("change object property!", function() {

            var dog = {name: "Rex", age: 12};

            var action = actionStack.actions["changeObjectProperty!"](dog);
            actionStack.addAction(action);

            dog.name = "Hox";

            actionStack.undo();

            expect(dog.name).toEqual("Rex");
        });

        it("cascades through the changes", function() {

            var dog = {name: "Rex", age: 12};

            var action = actionStack.actions["changeObjectProperty!"](dog);
            actionStack.addAction(action);

            dog.name = "Hox";

            var newAction = actionStack.actions["changeObjectProperty!"](dog);
            actionStack.addAction(newAction);

            dog.name = "Fux";

            expect(dog.name).toEqual("Fux");
            actionStack.undo();
            expect(dog.name).toEqual("Hox");
            actionStack.undo();
            expect(dog.name).toEqual("Rex");
        });
    });

});