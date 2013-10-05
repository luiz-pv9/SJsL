;(function(SJsL) {

	SJsL.Tree = function(config) {

		config = config || {};
		this.tree = [];
		this.uniqueField = config.uniqueField || 'id';
		this.generateId = config.generateId || false;
		this.childrenField = config.childrenField || 'children';
	}

	SJsL.Tree.prototype.setData = function(tree) {

		if(SJsL.typeOf(tree) === 'array') {

			this.tree = tree;
		} 
		else {

			this.tree = [tree];
		}
		return this;
	}

	// Loops through each node of the tree.
	// If the node is raw data, it gets wrapped in the TreeNode class.
	SJsL.Tree.prototype.propagate = function(subtree) {

		var self = this;

		this.tree.each(function(node) {

			if(node instanceof SJsL.TreeNode) { return; }

			if(self.generateId) {

				node[self.uniqueField] = SJsL.uniqueId();
			}

			node = new SJsL.TreeNode(self, node);
			node.propagate();
		});

		return self;
	}

	SJsL.Tree.prototype.toNative = function(subtree) {

		var self = this;
		var container = [];
		subtree = subtree || this.tree;
		subtree.each(function(node) {
			
			var newNode = node.data;

			if(node.hasChildren()) {

				newNode[self.childrenField] = self.toNative(node.children());
			}

			container.push(newNode);
		});
		return container;
	}

	// Loops through each node in the tree and assign the attribute ParentId to
	// each one of them.
	SJsL.Tree.prototype.assignParentIds = function(subtree, id) {

		var self = this;
		subtree = subtree || self.tree;
		id = id || null;
		subtree.each(function(node) {

			node.parentId = id;
			if(node.hasChildren()) {

				self.assignParentIds(node.children(), node.id);
			}
		});

		return self;
	}

	SJsL.Tree.prototype.search = function(fn) {

		var list = [];
		this.each(function(node, deep) {

			if(fn(node.data, deep)) {

				list.push(node);
			}
		});
		return list;
	}

	SJsL.Tree.prototype.each = function(fn, subtree, deep) {

		var self = this;
		subtree = subtree || self.tree;
		deep = deep || 0;
		subtree.each(function(node) {

			// Calls the callback
			fn(node.data, deep);

			if(node.hasChildren()) {

				self.each(fn, node.children(), deep + 1);
			}

		});
	}

	SJsL.Tree.prototype.find = function(id, subtree) {

		var self = this;
		subtree = subtree || self.tree;
		for(var i = 0; i < subtree.length; i++) {

			if(subtree[i].id === id) {

				return subtree[i].data;
			}
			else {

				if(subtree[i].hasChildren()) {

					var item = this.find(id, subtree[i].children());
					if(item) return item;
				}
			}
		}
		return null;
	}

	SJsL.Tree.prototype.clone = function() {
		
		var newTree = SJsL.deepClone(this.toNative());
		return new SJsL.Tree({

			childrenField: this.childrenField,
			uniqueField: this.uniqueField,
			generateId: this.generateId
		}).setData(newTree).propagate().assignParentIds();
	}


})(window.SJsL);