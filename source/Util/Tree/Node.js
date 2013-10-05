;(function(SJsL) {

    SJsL.TreeNode = function(tree, node) {

        node = node || {};
        this.tree = tree;
        this.data = node;
        this.id = node.id;
    };

    SJsL.TreeNode.prototype.setData = function(data) {

        this.data = data;
        this.id = data[this.tree.uniqueField];
    }

    SJsL.TreeNode.prototype.set = SJsL.TreeNode.prototype.setData;

    SJsL.TreeNode.prototype.assureChildNotUndefined = function() {

        this.data[this.tree.childrenField] = this.data[this.tree.childrenField] || [];
    }

    SJsL.TreeNode.prototype.propagate = function() {

        var self = this;
        var newChildren = [];
        this.children().each(function(childNode) {

            // If, by any change, the node is already wrapped in the NodeClass, 
            // skip that.
            if(childNode instanceof SJsL.TreeNode) { return; }

            var newNode = new TreeNode(self.tree, childNode);

            if(newNode.hasChildren()) {

                newNode.propagate();
            }

            childNode = newNode;
        });
        return self;
    }

    SJsL.TreeNode.prototype.hasChildren = function() {

        this.assureChildNotUndefined();
        return this.children().length > 0;
    }

    SJsL.TreeNode.prototype.childrenCount = function() {

        this.assureChildNotUndefined();
        return this.children().length;
    }

    SJsL.TreeNode.prototype.children = function() {
        this.assureChildNotUndefined(); 
        return this.data[this.tree.childrenField];
    }

    SJsL.TreeNode.prototype.addChild = function(node) {

        this.assureChildNotUndefined();
        this.children().push(new SJsL.TreeNode(this.tree, node));
        return this;
    }

    SJsL.TreeNode.prototype.isRoot = function() {
        return !this.parentId;
    }

    SJsL.TreeNode.prototype.parent = function() {

        if(this.isRoot()) {
            
            return null;
        }
        return this.tree.find(this.parentId);
    }

    SJsL.TreeNode.prototype.subTree = function() {

        var tree = new SJsL.Tree({
            uniqueField: this.tree.uniqueField,
            generateId: this.tree.generateId,
            childrenField: this.tree.childrenField
        });

        tree.setData(self.data);
        return tree.propagate();
    }

})(window.SJsL);