"use strict";


exports.metaMethod = function (name) {
	return function (list) {
		if (list.forEach) {
			list.forEach(action.bind(this));

		} else {
			action.call(this, list);
		}

		function action (item) {this[name](item);}

		return this;
	}
};

exports.forStringSegments = function (string, delimiter, iterator, that) {
	if (typeof string === 'string') {
		string.split(delimiter).forEach(iterator, that);
	}

	return that;
};

exports.decycle = function (object) {//doug crockford's decycle method in cycle.js
	var objects = [], paths = [];

	return (function derez(value, path) {
		var i, name, array;

		switch (typeof value) {
			case 'object':
				if (
					value === null ||
					value instanceof Boolean ||
					value instanceof Date ||
					value instanceof Number ||
					value instanceof RegExp ||
					value instanceof String
				) {
					return value;
				}

				for (i = 0; i < objects.length; i += 1) {
					if (objects[i] === value) {
						return {$ref: paths[i]};
					}
				}

				objects.push(value);
				paths.push(path);

				if (Object.prototype.toString.apply(value) === '[object Array]') {
					array = [];
					for (i = 0; i < value.length; i += 1) {
						array[i] = derez(value[i], path + '[' + i + ']');
					}

				} else {
					array = {};
					for (name in value) {
						if (Object.prototype.hasOwnProperty.call(value, name)) {
							array[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
						}
					}
				}

				return array;

			case 'number':
			case 'string':
			case 'boolean':
				return value;
		}
	}(object, '$'));
};
