;(function(SJsL) {

    SJsL.deepClone = function(arg) {

        if('array'.isTypeOf(arg)) {

            return SJsL.deepCloneArray(arg);
        } 

        if('object'.isTypeOf(arg)) {

            return SJsL.deepCloneObject(arg);
        }
        return null;
    }

    SJsL.shallowClone = function(arg) {

        if('array'.isTypeOf(arg)) {

            return SJsL.shallowCloneArray(arg);
        } 

        if('object'.isTypeOf(arg)) {

            return SJsL.shallowCloneObject(arg);
        }
        return null;
    }

    SJsL.deepCloneArray = function(array) {

        var newArray = [];
        array.each(function(item) {

            if('array'.isTypeOf(item)) {

                newArray.push(SJsL.deepCloneArray(item));
            }
            else if ('object'.isTypeOf(item)) {

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
        SJsL.keys(obj).each(function(prop) {

            if('array'.isTypeOf(obj[prop])) {

                newObject[prop] = SJsL.deepCloneArray(obj[prop]);
            }
            else if('object'.isTypeOf(obj[prop])) {

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
        array.each(function(e) {

            newArray.push(e);
        });
        return newArray;
    }

    SJsL.shallowCloneObject = function(obj) {

        var newObject = {};
        SJsL.keys(obj).each(function(prop) {

            newObject[prop] = obj[prop];
        });
        return newObject;
    }


})(SJsL);