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
		expect(actionStack.getAction("changeTextValue")()).toBeTruthy();
	});

	describe("Actions", function() {


		it("changeTextValue", function() {

			var action = actionStack.actions["changeTextValue"]("Anand");
			actionStack.push(action);
			expect(actionStack.undo()).toEqual("Anand");
		});

		it("change object property", function() {

			var dog = {name: "Rex", age: 12};

			var action = actionStack.actions["changeObjectProperty"](dog);

			actionStack.push(action);

			dog.name = "Hox";

			expect(actionStack.undo()).toEqual({name: "Rex"});
		});

		it("change object property!", function() {

			var dog = {name: "Rex", age: 12};

			var action = actionStack.actions["changeObjectProperty!"](dog);
			actionStack.push(action);

			dog.name = "Hox";

			actionStack.undo();

			expect(dog.name).toEqual("Rex");
		});

		it("cascades through the changes", function() {

			var dog = {name: "Rex", age: 12};

			var action = actionStack.actions["changeObjectProperty!"](dog);
			actionStack.push(action);

			dog.name = "Hox";

			var newAction = actionStack.actions["changeObjectProperty!"](dog);
			actionStack.push(newAction);

			dog.name = "Fux";

			expect(dog.name).toEqual("Fux");
			actionStack.undo();
			expect(dog.name).toEqual("Hox");
			actionStack.undo();
			expect(dog.name).toEqual("Rex");
		});

		it("creates and pushes an action on the same method", function() {

			var dog = {name: "Rex", age: 12};

			actionStack.push("changeObjectProperty!", dog);

			dog.name = "Foo";
			actionStack.rollback();

			expect(dog.name).toEqual("Rex");
		});

		it("changeArrayItens", function() {

			var list = [1,2,3,4,5];
			actionStack.push("changeArrayItens!", list);
			list.push(3);
			actionStack.undo();
			expect(SJsL.A.last(list)).toEqual(5);
			
			actionStack.push("changeArrayItens!", list);

			SJsL.A.remove(list, 2);
			SJsL.A.remove(list, 5);
			actionStack.undo();

			expect(list.length).toEqual(5);
			expect(list[1]).toEqual(2);
		});

		describe("Custom actions", function() {

			var animal = null;	

			beforeEach(function() {

				animal = {name: "Bucket", specie: {id: 1, name: "Dog"}};
			});

			it("adds a custom action", function() {

				actionStack.registerAction("changeSpecie", function(animal) {
					
					var commit = function() {

						this.data["previous"] = animal;
					}

					var rollback = function() {

						if(animal.specie !== this.data["previous".specie]) {

							animal.specie = this.data["previous"].specie;
						}
						return animal;
					}
					return new this.Action(commit, rollback);
				});

				expect(actionStack.getAction("changeSpecie")).toBeTruthy();
			});

			it("registers a custom action", function() {

				actionStack.registerAction("changeSpecie", function(animal) {

					var commit = function() {
						this.data["previous"] = SJsL.shallowClone(animal);
					}

					var rollback = function() {

						if(animal.specie !== this.data["previous"].specie) {

							animal.specie = this.data["previous"].specie;
						}
						return animal;
					}
					return new this.Action(commit, rollback);
				});

				actionStack.push("changeSpecie", animal);

				animal.specie = {id: 2, name: "Cat"};

				actionStack.undo();

				expect(animal.specie.id).toEqual(1);
			});

			it("registers a custom action - Arrays, for example", function() {

				actionStack.registerAction("changeArrayItem", function(list) {

					var commit = function() {
						this.data["previous"] = SJsL.shallowClone(list);
					}

					var rollback = function() {

						var diffList = [];
						var self = this;
						SJsL.A.each(list, function(e) {

							if(!SJsL.A.contains(self.data["previous"], e)) {

								diffList.push(e);
							}
						});
						return diffList;
					}
					return new this.Action(commit, rollback);
				});

				var list = [1,2,3,4];
				actionStack.push("changeArrayItem", list);
				list.push(5);

				var diff = actionStack.undo();

				expect(diff.length).toEqual(1);
				expect(SJsL.A.head(diff)).toEqual(5);
			});
		});
	});

});