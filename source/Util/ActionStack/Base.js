;(function(SJsL) {

	var Action = function(commit, rollback) {

		this.id = SJsL.generateId();
		this.data = {};
		this.performed = true;

		this.rollback = function() {

			return rollback.call(this);
		}
		commit.call(this);
	}

	SJsL.ActionStack = function(name) {

		this.name = name;
		this.Action = Action;
		this.actionStack = [];

		this.registerAction = function(name, fn) {

			var self = this;
			this.actions[name] = function() {

				return fn.apply(self, arguments);
			};
		}

		this.actions = {

			'changeTextValue': function(text) {

				var commit = function() {

					this.data["previous"] = text;
				};

				var rollback = function() {

					return this.data["previous"];
				};
				return new Action(commit, rollback);
			},

			'changeObjectProperty': function(object) {

				var commit = function() {

					this.data["previous"] = object.shallowClone();
				};

				var rollback = function() {

					var diff = {};
					var self = this;
					object.keys().each(function(key) {

						if(object[key] !== self.data["previous"][key]) {

							diff[key] = self.data["previous"][key];
						}
					});
					return diff;
				};
				return new Action(commit, rollback);
			},

			'changeObjectProperty!': function(object) {

				var commit = function() {

					this.data["previous"] = object.shallowClone();
				};

				var rollback = function() {

					var self = this;
					object.keys().each(function(key) {

						if(object[key] !== self.data["previous"][key]) {

							object[key] = self.data["previous"][key];
						}
					});
					return object;
				};
				return new Action(commit, rollback);
			},

			'changeArrayItens': function(list) {

				var commit = function() {

					this.data["previous"] = list.shallowClone();
				}

				var rollback = function() {

					var diffList = [];
					var self = this;
					list.each(function(e) {

						if(!self.data["previous"].contains(e)) {
							
							diffList.push(e);
						}
					});

					self.data["previous"].each(function(e) {

						if(!list.contains(e)) {
							
							diffList.push(e);
						}
					});
					return diffList;
				}

				return new Action(commit, rollback);
			},

			'changeArrayItens!': function(list) {

				var commit = function() {

					this.data["previous"] = list.shallowClone();
				}

				var rollback = function() {

					var self = this;
					var indexesToRemove = [];
					list.each(function(e, index) {

						if(self.data["previous"][index] !== list[index]) {

							indexesToRemove.push(index);
						}
					});

					indexesToRemove.each(function(i) {
						list.removeAt(i);
					});

					self.data["previous"].each(function(e) {

						if(!list.contains(e)) {
							
							list.insertAt(self.data["previous"].indexOf(e), e);
						}
					});

					return list;
				}

				return new Action(commit, rollback);
			},
		};

		this.getAction = function(actionName) {

			return this.actions[actionName];
		}

		this.push = function() {

			var args = Array.prototype.slice.call(arguments, 0);
			var action = args[0];
			args.removeAt(0);

			if('object'.isTypeOf(action)) {

				this.actionStack.push(action);
			}
			else if('string'.isTypeOf(action)) {

				var _action = this.getAction(action).apply(void 0, args);
				this.actionStack.push(_action);
			}
		}

		this.undo = function() {

			return this.actionStack.pop().rollback();
		}

		this.rollback = this.undo;
	}

})(SJsL);