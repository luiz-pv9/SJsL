;(function(SJsL) {

	var _id = 0;

    SJsL.setBaseId = function(id) {
        _id = id;
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

