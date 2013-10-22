;(function(SJsL) {

    SJsL.deepClone = function(arg) {

        if(SJsL.isArray(arg)) {

            return SJsL.deepCloneArray(arg);
        } 

        if(SJsL.isObject(arg)) {

            return SJsL.deepCloneObject(arg);
        }
        return null;
    }

    SJsL.shallowClone = function(arg) {

        if(SJsL.isArray(arg)) {

            return SJsL.shallowCloneArray(arg);
        } 

        if(SJsL.isObject(arg)) {

            return SJsL.shallowCloneObject(arg);
        }
        return null;
    }

    SJsL.deepCloneArray = function(array) {

        var newArray = [];
        SJsL.A.each(array, function(item) {

            if(SJsL.isArray(item)) {

                newArray.push(SJsL.deepCloneArray(item));
            }
            if(SJsL.isObject(item)) {

                newArray.push(SJsL.deepCloneObject(item));
            }
            else {

                newArray.push(item);
            }
        });
        return newArray;
    }

    SJsL.deepCloneObject = function(obj) {

        var newObject = {};
        SJsL.A.each(SJsL.O.keys(obj), function(prop) {

            if(SJsL.isArray(obj[prop])) {

                newObject[prop] = SJsL.deepCloneArray(obj[prop]);
            }
            if(SJsL.isObject(obj[prop])) {

                newObject[prop] = SJsL.deepCloneObject(obj[prop]);
            }
            else {

                newObject[prop] = obj[prop];
            }
        });
        return newObject;
    }

    SJsL.shallowCloneArray = function(array) {
        
        var newArray = [];
        SJsL.A.each(array, function(e) {

            newArray.push(e);
        });
        return newArray;
    }

    SJsL.shallowCloneObject = function(obj) {

        var newObject = {};
        SJsL.A.each(SJsL.O.keys(obj), function(prop) {

            newObject[prop] = obj[prop];
        });
        return newObject;
    }


})(SJsL);