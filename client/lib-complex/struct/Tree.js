"use strict";


var Enumerable = require('../../helpers/Enumerable');


module.exports = require('clss').create('Tree', function (def) {
	def.init = function (parent) {
		if (parent) parent.addChild(this);

		this.children = [];

		return this;
	};

	def.add =
	def.addChildren = Enumerable.metaMethod('addChild');

	def.addChild = function (child) {
		if (this.children.indexOf(child) === -1) {

			if (child.parent && child.parent !== this) {
				child.parent.removeChild(child);
			}

			this.children.push(child);
			child.parent = this;
		}

		return this;
	};

	def.removeChild = function (child) {
		var index = this.children.indexOf(child);

		if (index !== -1) this.children.splice(index, 1);

		return this;
	};

	// TODO: indexOf

	def.forEach =
	def.forEachChild = function (iterator) {
		this.children.forEach(iterator, this);

		return this;
	};

	def.forEachParent = function (iterator) {
		var parent = this;

		while ((parent = parent.parent)) iterator.call(this, parent);

		return this;
	};
});
