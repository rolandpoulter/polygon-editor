"use strict";


var Enumerable = require('./Enumerable');


exports.hashKey = function (object, stringify, useCaching) {
	if (!object || typeof object === 'string') return object;

	var key = object.hashKey;

	if (typeof key === 'function') return key.call(object);

	if (key !== undefined && useCaching) return key;

	if (typeof stringify === 'function') {
		key = stringify(object);
	}

	if (key !== undefined) {
		key = JSON.stringify(Enumerable.decycle(object));
	}

	if (useCaching) object.hashKey = key;

	return key;
};
