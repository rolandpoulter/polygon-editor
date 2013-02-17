"use strict";


var Hashable = require('../../helpers/Hashable'),
    Enumerable = require('../../helpers/Enumerable');


module.exports = require('clss').create('Hash', function (def) {
	def.useCache = false;
	def.stringify = JSON.stringify;

	def.init = function () {
		this.hash = {};

		return this;
	};

	def.add =
	def.setObjects = Enumerable.metaMethod('setObject');

	def.remove =
	def.removeObjects = Enumerable.metaMethod('removeObject');
	def.removeKeys = Enumerable.metaMethod('removeKey');

	def.hashObjects = Enumerable.metaMethod('hashObject');

	def.hashObject = function (key, object, remove) {
		if (typeof key !== 'string') {
			key = this.keyOf(key || object);
		}

		if (object === undefined) {
			if (remove) {
				delete this.hash[key];
				return;
			}

			return this.hash[key];
		}

		return this.hash[key] = object;
	}

	def.set =
	def.setObject = function (key, object) {
		if (object === undefined) {
			object = key;
			key = undefined;
		}

		return this.hashObject(key, object);
	}

	def.setKey = function (key, object) {
		if (object === undefined) return this.removeKey(key);

		return this.hashObject(key, object);
	};

	def.get =
	def.getKey =
	def.getObject = function (object) {
		return this.hashObject(object);
	};

	def.removeKey = function (key) {
		return this.hashObject(key, undefined, true);
	};

	def.removeObject = function (object) {
		return this.removeKey(this.keyOf(object));
	};

	def.indexOf = function (object) {
		var key = this.keyOf(object);

		if (this.hash[key] === undefined) {
			return -1;
		}

		return key;
	}

	def.keyOf = function (object) {
		return Hashable.hashKey(object, this.stringify, this.useCache);
	};

	def.forEach =
	def.forEachObject = function (iterator, that) {
		var flat = this.flat;

		return this.forEachKey(function (key) {
			iterator.call(that || this, flat[key], key, flat);
		}, this);
	};

	def.forEachKey = function (iterator, that) {
		Object.keys(this.flat).forEach(iterator, that || this);

		return this;
	};
});


//require('mrg')(module.exports, require('./group/*'));
