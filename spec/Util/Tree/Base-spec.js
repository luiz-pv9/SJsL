describe("Util / Tree / Base", function() {

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

		tree = new SJsL.Tree({
			childrenField: "children",
			uniqueField: "id"
		}).setData(rawTree);
	});


	it("exists", function() {
		expect(tree).toBeTruthy();
	});


	it("propagate", function() {
		tree.propagate();
		expect(tree.tree[0] instanceof SJsL.TreeNode).toBe(true);
	});

	it("toNative", function() {
		
		tree.propagate();
		var rawTree = tree.toNative();
		expect(rawTree.length).toEqual(1);
		expect(rawTree[0] instanceof SJsL.TreeNode).toBe(false);
		expect(rawTree[0].name).toEqual("Anand");

		rawTree[0].name = "Vishy";
		// Don't change the original
		expect(tree.find(1).name).toEqual("Anand");
	});

	it("each", function() {
		tree.propagate();
		var count = 0;
		tree.each(function(node) {
			count += 1;
		});
		expect(count).toEqual(6);
	});

	it("search", function() {
		tree.propagate();
		var nodes = tree.search(function(node) {
			return node.name === "Anand";
		});
		expect(nodes.length).toEqual(1);
		nodes[0].name = "Jacob";

		// It changes the original node as well
		expect(tree.tree[0].data.name).toEqual("Jacob");
	});

	it("eachWrapped", function() {

		tree.propagate();
		tree.eachWrapped(function(node) {
			expect(node instanceof SJsL.TreeNode).toBe(true);
		});
	});

	it("find", function() {
		tree.propagate();
		var node = tree.find(2);
		expect(node.name).toEqual("Carlsen");
		node.name = "Magnus";
		expect(tree.find(2).name).toEqual("Magnus");
		expect(tree.find(2, true).hasChildren()).toBe(false);
		expect(tree.find(2, true).parent().name).toEqual("Anand");
		expect(tree.find(2, true).parent(true).children().length).toEqual(2);
	});

	it("clone", function() {
		tree.propagate();

		var newTree = tree.clone();
		newTree.find(2).name = "Magnus";

		expect(newTree.find(2).name).toEqual("Magnus");
		expect(tree.find(2).name).toEqual("Carlsen");
	});


	describe("TreeNode", function() {

		var node = null;

		beforeEach(function() {
			tree.propagate();
			node = tree.find(2, true);
		});

		it("setData", function() {
			node.setData({name: "9gag", id: 9, children: [
				{name: "Meme", id: 10}
			]});
			expect(tree.find(9).name).toEqual("9gag");
			expect(tree.find(10).name).toEqual("Meme");
		});

		it("hasChildren", function() {

			expect(node.hasChildren()).toEqual(false);
		});

		it("childrenCount", function() {
			expect(node.childrenCount()).toEqual(0);	
		});

		it("children", function() {
			expect(node.children()).toEqual([]);
		});

		it("addChild", function() {
			node.addChild({
				name: "Jack",
				id: 12
			});

			expect(node.hasChildren()).toBe(true);
			expect(tree.find(12, true).parent(true)).toEqual(node);
		});

		it("removeChild", function() {
			node.addChild({
				name: "Jack",
				id: 12
			});

			expect(node.hasChildren()).toBe(true);
			expect(tree.find(12, true).parent(true)).toEqual(node);

			node.addChild({
				name: "Black",
				id: 13
			});

			expect(node.children().length).toBe(2);
			node.removeChild(12);
			expect(node.children().length).toBe(1);

			node.addChild({
				name: "Jack",
				id: 12
			});

			var childWrapped = tree.find(12, true);
			node.removeChild(childWrapped);
			expect(node.children().length).toBe(1);
		});

		it("isRoot", function() {

			expect(node.isRoot()).toBe(false);
			expect(tree.find(1, true).isRoot()).toBe(true);
		});

		it("parent", function() {

			expect(node.parent(true)).toEqual(

				tree.find(node.parentId, true)
			);
		});

		it("subTree", function() {

			var subTree = node.subTree();
			var count = 0;
			subTree.each(function(node) {
				count += 1;
			});
			expect(count).toEqual(1);
		});
	});
});