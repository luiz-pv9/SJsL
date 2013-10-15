;(function(SJsL) {

    SJsL.TreeNode = function(tree, node) {

        node = node || {};
        this.tree = tree;
        this.data = node;
        this.id = node.id;

        if(this.tree.generateId) {
            this.id = SJsL.generateId();
        }
    };

    SJsL.TreeNode.prototype.setData = function(data) {


        if(data[this.tree.uniqueField]) {

            this.id = data[this.tree.uniqueField];
        }
        else {

            this.id = SJsL.generateId();
        }

        this.data = data;

        if(data[this.tree.childrenField]) {
            this.propagate();
        }
        return this;
    }

    SJsL.TreeNode.prototype.set = SJsL.TreeNode.prototype.setData;

    SJsL.TreeNode.prototype.assureChildNotUndefined = function() {

        this.data[this.tree.childrenField] = this.data[this.tree.childrenField] || [];
    }

    SJsL.TreeNode.prototype.propagate = function() {

        var self = this;
        var newChildren = [];
        this.children().each(function(childNode, index) {

            // If, by any change, the node is already wrapped in the NodeClass, 
            // skip that.
            if(childNode instanceof SJsL.TreeNode) { 

                childNode.propagate();
                return;
            }

            var newNode = new SJsL.TreeNode(self.tree, childNode);

            if(newNode.hasChildren()) {

                newNode.propagate();
            }

            self.children()[index] = newNode;
        });
        return self;
    }

    SJsL.TreeNode.prototype.hasChildren = function() {

        return this.childrenCount() > 0;
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
        var newNode = new SJsL.TreeNode(this.tree, node);
        newNode.parentId = this.id;
        this.children().push(newNode);
        return this;
    }

    SJsL.TreeNode.prototype.removeChild = function(node) {

        if('number'.isTypeOf(node)) {

            node = this.tree.find(node, true);
        }
        else if('object'.isTypeOf(node) && !(node instanceof SJsL.TreeNode)) {

            node = this.children().filter(function(n) {

                return n.data === node;
            }).head();
        }
        this.children().remove(node);
        return this;
    }

    SJsL.TreeNode.prototype.isRoot = function() {
        return !this.parentId;
    }

    SJsL.TreeNode.prototype.parent = function(wrapped) {

        if(this.isRoot()) {
            
            return null;
        }
        return this.tree.find(this.parentId, wrapped);
    }

    SJsL.TreeNode.prototype.subTree = function() {

        var tree = new SJsL.Tree({
            uniqueField: this.tree.uniqueField,
            generateId: this.tree.generateId,
            childrenField: this.tree.childrenField
        });

        tree.setData(this.data);
        return tree.propagate();
    }

})(SJsL);