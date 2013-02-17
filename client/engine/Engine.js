"use strict";


var Canvas = require('./Canvas'),
    Entity = require('./Entity'),
    Shader = require('./Shader'),
    Octree = require('./Octree'),
    Holder = require('./Holder');


module.exports = require('mttr').clss('Engine', function (def) {
	// TODO: need event handling for user input

	Holder.create(def);

	def.owner_name = 'engine';
	def.object_class = Canvas;
	def.object_name_plural = 'canvases';

	def.init = function (options) {
		this.octree = new Octree();

		return this.
			initEmitter().
			initHolder(options).

			set_object_list('entities').
			set_object_list('shaders');
	};

	def.render = function (callback, tick, _until) {
		var canvases = this.canvases;

		var stoppers = Object.keys(canvases).map(function (canvas_uid) {
			return canvases[canvas_uid].render(callback, tick, _until);
		});

		if (_until) return function () {
			stoppers.forEach(function (stopper) {
				stopper();
			});
		}

		return this;
	};

	def.render_until = function (callback, tick) {
		return this.render(callback, tick, true);
	};

	def.create_canvas = function (options) {
		options = options || {};

		options.engine = this;

		options.octree = this.octree;
		options.entities = this.entities;

		return this.create_object(options);
	};

	def.add_canvas = def.add_object;
	def.destroy_canvas = def.destroy_object;

	def.add_entity = function (entity) {
		return this.add_object(entity, Entity, 'entities', function () {
			this.octree.insert_entity(entity);
		});
	};

	def.remove_entity = function (entity) {
		return this.remove_object(entity, Entity, 'entities', function () {
			this.octree.remove_entity(entity);
		});
	};

	def.install_shader = function (shader) {
		return this.add_object(shader, Shader, 'shaders');
	};

	def.uninstall_shader = function (shader) {
		return this.remove_object(shader, Shader, 'shaders');
	};
});
