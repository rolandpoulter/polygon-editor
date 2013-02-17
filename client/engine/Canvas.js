"use strict";


var WebGLUtils = window.WebGLUtils,

    Camera = require('./Camera'),
    Octree = require('./Octree'),

    utils = require('./utils'),
    uid = require('./uid'),

    $ = window.$;


module.exports = require('clss').create('Canvas', function (def) {
	// TODO: need event handlers for clicking on stuff

	def.init = function (options) {
		utils.

			set_options(options, this, {
				uid: uid(),

				element: $('<canvas>'),

				camera: new Camera(),
				octree: new Octree(),

				entities: {},

				clear_color: [0.5, 0.5, 0.5, 0]
			}).

			set_option('context', options, this, WebGLUtils.setupWebGL(
				this.element[0],

				options.context_attributes,
				options.context_on_error
			));

		this.cache = this.context.cache = this.context.cache || {};

		return this;
	};

	def.set_size = function (width, height) {
		this.element.attr('width', width).attr('height', height);

		this.context.viewport(0, 0, width, height);

		if (this.camera.is_perspective()) {
			this.camera.update_aspect(width / height);
		}

		return this;
	};

	def.clear = function (type, color) {
		color = color || this.clear_color;

		var context = this.context;

		context.clearColor(color[0], color[1], color[2], color[3]);
		context.clear(context[type || 'COLOR_BUFFER_BIT']);

		return this;
	};

	def.render = function (callback, tick, _until) {
		var canvas = this,
		    stoppers = _until && [],
		    //entities = {opaque: [], transparent: []};
		    entities = this.entities;

		// TODO: room and portal rendering
		// TODO: light rendering

		//this.octree.get_entities(this.camera.to_frustum()).foEach(function (entity) {
			//if (!entity.is_visible()) return;

			//if (entity.is_opaque()) return entities.opaque.push(entity);

			//entities.transparent.unshift(entity);
		//});

		//entities.opaque.forEach(render_entity);
		//entities.transparent.forEach(render_entity);

		entities = Object.keys(entities).forEach(function (entity_uid) {
			render_entity(entities[entity_uid]);
		});

		function render_entity (entity) {
			var stopper = entity.render(canvas, callback, tick, _until);

			if (_until) stoppers.push(stopper);
		}

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
});
