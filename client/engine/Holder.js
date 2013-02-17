"use strict";


var utils = require('../utils');


module.exports = require('clss').create('Holder', function (def) {
	def.init = function (options) {
		options = options || {};

		utils.set_options(options, this, this, [
			'owner_name',
			'object_class',
			'object_name_plural'
		]);

		var defaults = {uid: utils.uid()};

		defaults[this.owner_name] = null;

		utils.set_options(options, this, defaults);

		return this.set_object_list(options.object_list);
	};

	def.owner_name = 'owner';
	def.object_class = this;
	def.object_name_plural = 'objects';

	def.set_owner = function (owner) {
		var last_owner = this[this.owner_name];

		if (last_owner && last_owner.object_class === this.constructor) {
			last_owner.remove_object(this);
		}

		this[this.owner_name] = owner;

		return this;
	};

	def.set_object_list = function (object_name_plural, object_list) {
		object_name_plural = object_name_plural || this.object_name_plural;

		this[object_name_plural] = object_list || {};

		return this;
	}

	def.create_object = function (options, object_class, object_name_plural) {
		object_class = object_class || this.object_class;
		object_name_plural = object_name_plural || this.object_name_plural;

		var object = new object_class(options);

		this[object_name_plural][object.uid] = object;

		return this;
	};

	def.add_object = function (object, object_class, object_name_plural, callback) {
		object_class = object_class || this.object_class;
		object_name_plural = object_name_plural || this.object_name_plural;

		if (object_class.derived(object)) {
			this[object_name_plural][object.uid] = object;

			object.set_owner(this);

			if (callback) callback.call(this);
		}

		return this;
	};

	def.remove_object = function (object, object_class, object_name_plural, callback) {
		if (object_class.derived(object)) {
			delete this[object_name_plural || this.object_name_plural][object.uid];

			if (callback) callback.call(this);
		}

		return this;
	};
});
