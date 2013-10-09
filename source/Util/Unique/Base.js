;(function(SJsL) {

	var _id = 0;

    SJsL.setBaseId = function(id) {
        if(_id < id) {

            _id = id;
        }
    }

    SJsL.currentId = function() {
        return _id;
    }

    SJsL._resetId = function(id) {
        id = id || 0;
        _id = 0;
    }

	SJsL.generateId = function(prefix) {
		prefix = prefix || "";
        var newId = prefix + (++_id);

        if(+newId) {
            return +newId;
        }
		return newId;
	}

})(window.SJsL);

