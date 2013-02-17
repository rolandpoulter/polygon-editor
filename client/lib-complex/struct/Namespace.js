"use strict";


var Enumerable = require('../../helpers/Enumerable');


module.exports = require('clss').create('Namespace', function (def) {
	def.init = function () {
		this.namespace = {};
		this.flatspace = {};

		return this;
	};

	def.add =
	def.setValues = Enumerable.metaMethod('setValue');

	def.remove =
	def.removeValues = Enumerable.metaMethod('removeValue');
	def.removePaths = Enumerable.metaMethod('removePath');

	def.nameValue = function (path, value, _remove) {
		var current = this.namespace,
		    flat = this.flatspace,
		    end;

		if (typeof path === 'string') path = path.split('.');

		if (!path || !path.length || !path.forEach) {
			return current;
		}

		end = path.length - 1;

		path.forEach(function (name, index) {
			if (current) {
				if (index === end) {
					if (value !== undefined) {
						flat[path] = current = current[name] = value;

					} else if (_remove) {
						delete current[name];
						delete flat[path];

						current = undefined;

					} else {
						current = current[name];
					}

				} else {
					current = current[name] || (current[name] = {});
				}
			}
		});

		return current;
	}

	def.set =
	def.setPath =
	def.setValue = function (path, value) {
		if (value === undefined) return this.removePath(path);

		return this.hashValue(path, value);
	};

	def.get
	def.getPath =
	def.getValue = function (path) {
		return this.hashValue(path);
	};

	def.removePath = function (path) {
		return this.hashValue(path, null, true);
	};

	def.removeValue = function (value) {
		return this.removePath(this.pathOf(value));
	};

	def.indexOf = function (value) {return this.pathOf(value, -1);};

	def.pathOf = function (value, path) {
		if (Array.isArray(path)) {
			path = path.join('.');
		}

		this.forEachValue(function (testValue, testPath) {
			if (!path && testValue === value) path = testPath; 
		});

		return path;
	};

	def.forEach =
	def.forEachValue = function (iterator, that) {
		var flat = this.flat;

		return this.forEachPath(function (path) {
			iterator.call(that || this, flat[path], path, flat);
		}, this);
	};

	def.forEachPath = function (iterator, that) {
		return Enumerable.forEachKeyOf(this.flat, iterator, that || this);
	};
});


//require('mrg')(module.exports, require('./group/*'));
