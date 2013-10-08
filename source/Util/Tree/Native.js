;(function(SJsL) {

    SJsL.NativeTree = function(config) {
        this.tree = [];
        this.uniqueField = config.uniqueField || 'id';
        this.generateId = config.generateId || false;
        this.childrenField = config.childrenField || 'children';
    }

    SJsL.NativeTree.prototype.setData = function(tree) {
        if(SJsL.typeOf(tree) === 'array') {

            this.tree = tree;
        } 
        else {

            this.tree = [tree];
        }
        return this;
    };

    SJsL.NativeTree.prototype.search = function(fn) {
        var list = [];
        this.each(function(node, deep) {
            if(fn(node, deep)) {
                list.push(node);
            }
        });
        return list;
    }

    SJsL.NativeTree.prototype.nodeChildren = function(node) {
        node[this.childrenField] = node[this.childrenField] || [];
        return node[this.childrenField];
    }

    SJsL.NativeTree.prototype.nodeHasChildren = function(node) {
        return this.nodeChildren(node).length > 0;
    }

    SJsL.NativeTree.prototype.nodeId = function(node) {
        return node[this.uniqueField];
    }

    SJsL.NativeTree.prototype.nodeParent = function(node) {

        if('number'.isTypeOf(node)) {
            node = this.find(node); 
        }

        var self = this;
        var parent = this.search(function(n) {

            return self.nodeChildren(n).contains(node);
        }).head();

        return parent;
    }

    SJsL.NativeTree.prototype.each = function(fn, subtree, deep) {

        var self = this;
        subtree = subtree || self.tree;
        deep = deep || 0;
        subtree.each(function(node) {
            fn(node, deep);

            if(self.nodeHasChildren(node)) {
                self.each(fn, self.nodeChildren(node), deep + 1);
            }
        });
    }

    SJsL.NativeTree.prototype.find = function(id, subtree) {

        var self = this;
        subtree = subtree || self.tree;
        for(var i = 0; i < subtree.length; i++) {

            if(self.nodeId(subtree[i]) === id) {

                return subtree[i];
            }
            else {

                if(self.nodeHasChildren(subtree[i])) {

                    var item = self.find(id, self.nodeChildren(subtree[i]));
                    if(item) return item;
                }
            }
        }
        return null;
    }

    SJsL.NativeTree.prototype.clone = function() {

        return new SJsL.NativeTree({
            uniqueField: this.uniqueField,
            childrenField: this.childrenField
        }).setData(this.tree.deepClone());
    }

})(window.SJsL);