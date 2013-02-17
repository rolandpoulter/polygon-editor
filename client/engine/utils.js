"use strict";


exports.uid = require('./uid');


exports.hash_array = function (array) {
	var hash = {};

	array.forEach(function (key) {
		hash[key] = key;
	});

	return hash;
}

exports.defer_options = function (options, that, methods, keys) {
	keys = keys || Object.keys(methods);
	options = options || {}

	keys.forEach(function (key) {
		exports.defer_option(key, options, that, methods[key])
	});

	return exports;
};

exports.defer_option = function (key, options, that, method) {
	if (options.hasOwnProperty(key)) that[method](options[key]);

	return exports;
};

exports.set_options = function (options, that, defaults, keys) {
	keys = keys || Object.keys(defaults);
	options = options || {};
	defaults = defaults || {};

	keys.forEach(function (key) {
		exports.set_option(key, options, that, defaults[key]);
	});

	return exports;
};

exports.set_option = function (key, options, that, default_value) {
	that[key] = options.hasOwnProperty(key) ?
		options[key] :

		that.hasOwnProperty(key) ?
			that[key] :
			default_value;

	return exports;
};
