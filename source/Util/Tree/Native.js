;(function(SJsL) {

    SJsL.NativeTree = function(config) {

        this.tree = [];
        this.uniqueField   = config.uniqueField   || 'id';
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

    SJsL.NativeTree.prototype.updateIdRegister = function() {

        var highest = this.flatten().pluck(this.uniqueField).max();
        if(+highest) {

            SJsL.setBaseId((+highest) + 1);
        }
    }

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

    SJsL.NativeTree.prototype.nodeSetId = function(node, id) {

        node[this.uniqueField] = id;
        return node;
    }

    SJsL.NativeTree.prototype.duplicate = function(id) {

        var node = this.find(id);
        var newNode = node.deepClone();
        this.nodeUpdateId(newNode);
        this.nodeChildren(this.nodeParent(node)).push(newNode);
        return newNode;
    }

    SJsL.NativeTree.prototype.remove = function(id) {

        var node = this.find(id);
        this.nodeChildren(this.nodeParent(node)).remove(node);
        return node;
    }

    SJsL.NativeTree.prototype.moveNode = function(fromId, toId) {

        var node = this.remove(fromId);
        this.nodeChildren(this.find(toId)).push(node);
        return this;
    }

    SJsL.NativeTree.prototype.nodeUpdateId = function(node) {

        var self = this;
        this.nodeSetId(node, SJsL.generateId());
        if(self.nodeHasChildren(node)) {

            self.nodeChildren(node).each(function(node) {

                self.nodeUpdateId(node);
            });
        }
    }

    SJsL.NativeTree.prototype.nodeParent = function(node) {

        if('number'.isTypeOf(node)) {

            node = this.find(node); 
        }

        var self = this;
        // The parent of the node is the one that contains it
        var parent = this.findBy(function(n) {

            return self.nodeChildren(n).contains(node);
        });

        return parent;
    }

    SJsL.NativeTree.prototype.flatten = function() {

        var list = [];
        this.each(function(node) {

            list.push(node);
        });
        return list;
    }

    SJsL.NativeTree.prototype.associateUniqueValues = function() {

        var self = this;
        self.updateIdRegister();

        this.each(function(node) {

            if(!self.nodeId(node)) {

                self.nodeSetId(node, SJsL.generateId());
            }
        });
        return this;
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

    SJsL.NativeTree.prototype.findBy = function(fn, subtree) {

        var self = this;
        subtree = subtree || self.tree;
        for(var i = 0; i < subtree.length; i++) {

            if(fn(subtree[i])) {

                return subtree[i];
            }
            else {

                if(self.nodeHasChildren(subtree[i])) {

                    var item = self.findBy(fn, self.nodeChildren(subtree[i]));
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

})(SJsL);