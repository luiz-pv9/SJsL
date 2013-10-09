describe("Util / Tree / Native", function() {
    
    var rawTree = null;
    var tree = null;

    beforeEach(function() {
        rawTree = {
            name: "Anand",
            id: 1,
            children: [
                {
                    name: "Carlsen",
                    id: 2,
                    children: []
                },
                {
                    name: "Octopus",
                    id: 3,
                    children: [
                        {
                            name: "Lula",
                            id: 4
                        },
                        {
                            name: "Vishy",
                            id: 5,
                            children: [
                                {
                                    name: "Chess",
                                    id: 6
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        tree = new SJsL.NativeTree({
            childrenField: "children",
            uniqueField: "id"
        }).setData(rawTree);
    });

    it("exists", function() {
        expect(tree).toBeTruthy();
    });

    it("search", function() {
        nodes = tree.search(function(node) {
            return node.name == "Lula";
        });

        expect(nodes.head().id).toEqual(4);
    });

    it("each", function() {
        
        var count = 0;
        tree.each(function(node) {
            count += 1;
        });
        expect(count).toEqual(6);
    });

    it("find", function() {

        var node = tree.find(3);
        expect(node.name).toEqual("Octopus");
    });

    it("findBy", function() {
        var node = tree.findBy(function(node) {
            return node.id === 3;
        });

        expect(node.name).toEqual("Octopus");
    });

    it("nodeChildren", function() {

        var node = tree.find(3);
        expect(tree.nodeChildren(node).length).toEqual(2);
    });

    it("nodeParent", function() {

        var node = tree.find(3);
        expect(tree.nodeParent(node)).toEqual(tree.find(1));
    });

    it("duplicate", function() {

        tree.updateIdRegister();

        var newNode = tree.duplicate(3);

        expect(tree.nodeParent(newNode)).toEqual(
            tree.nodeParent(tree.find(3))
        );
    });

    it("remove", function() {
        expect(tree.nodeChildren(tree.find(3)).length).toBe(2);
        tree.remove(4);
        expect(tree.nodeChildren(tree.find(3)).length).toBe(1);
    });

    it("moveNode", function() {
        expect(tree.nodeChildren(tree.find(3)).length).toEqual(2);
        expect(tree.nodeChildren(tree.find(5)).length).toEqual(1);
        tree.moveNode(6, 3);
        expect(tree.nodeChildren(tree.find(3)).length).toEqual(3);
        expect(tree.nodeChildren(tree.find(5)).length).toEqual(0);
    });

});