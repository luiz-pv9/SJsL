;(function(SJsL) {

    SJsL.typeOf = function(arg) {

        return Object.prototype.toString.call(arg).replace("[object ", "")
            .replace("]", "").toLowerCase();
    }

    SJsL.isArray = function(arg) {

        return SJsL.typeOf(arg) === 'array';
    }

    SJsL.isObject = function(arg) {

        return SJsL.typeOf(arg) === 'object';
    }

    SJsL.isString = function(arg) {

        return SJsL.typeOf(arg) === 'string';
    }

    SJsL.isNumber = function(arg) {

        return SJsL.typeOf(arg) === 'number';
    }

    SJsL.isUndefined = function(arg) {

        return SJsL.typeOf(arg) === 'undefined';
    }

    SJsL.isNaN = function(arg) {

        return SJsL.isNumber && arg !== +arg;
    }

    SJsL.isEmpty = function(arg) {

        if(SJsL.isNull(arg)) return ture;
        if(SJsL.isArray(arg) || SJsL.isString(arg)) return arg.length === 0;
        return false;
    }

    SJsL.isFunction = function(arg) {

        return SJsL.typeOf(arg) === 'function';
    }

    SJsL.isDate = function(arg) {

        return SJsL.typeOf(arg) === 'date';
    }

    SJsL.isNull = function(arg) {

        return SJsL.typeOf(arg) === 'null';
    }

})(SJsL);