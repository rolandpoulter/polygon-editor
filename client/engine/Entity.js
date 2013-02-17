"use strict";


var requestAnimFrame = window.requestAnimFrame,

    async = require('async'),

    Holder = require('./Holder'),

    utils = require('./utils'),

		Mesh = require('./Mesh'),

    mat4 = window.mat4;


module.exports = require('mttr').clss('Entity', function (def) {
	// TODO: move shader list from engine to entity
	// TODO: need event handlers for clicking on stuff

	Holder.create(def);

	def.owner_name = 'engine';
	def.object_class = this;
	def.object_name_plural = 'children';

	def.init = function (options) {
		options = options || {};

		this.
			initEmitter().
			initHolder(options).

			set_object_list('shaders').

			set_parent(options.parent).
			set_engine(options.engine);

		utils.
			set_options(options, this, {
				transform: mat4.identity(),

				visible: true,
				opaque: true,

				components: this.hasOwnProperty('components') ?
					this.components :
					Object.create(this.components)
			}).

			set_options(options, this, (function (components) {
				var default_components = {};

				components.forEach(function (name) {
					default_components['on_' + name] = idle_callback;
				});

				return default_components;
			})(this.components));

		if (options.mesh) {
			this.mesh = Mesh.derived(options.mesh) ? options.mesh : new Mesh(options.mesh);
		}

		return this;
	};

	def.components = ['load', 'buffer', 'render', 'script', 'update'];

	def.set_engine = def.set_owner;

	def.set_owner =
	def.set_parent = function (parent) {
		var uid = this.uid;

		if (parent && parent.children) {
			this.root = parent.root || parent;
			this.parent = parent;

			if (parent.children[uid] && parent.children[uid].parent) {
				delete parent.children[uid].parent;
			}

			parent.children[uid] = this;
		}

		return this;
	};

	def.get_buffers = function () {
		if (this.mesh) {
			return this.mesh.get_buffers();
		}

		return null;
	};

	def.is_visible = function () {
		return this.visible;
	};

	def.is_opaque = function () {
		return this.opaque;
	};

	def.transform_matrix = function () {
		var matrix = mat4.create(this.transform),
		    parent = this;

		while ((parent = parent.parent)) {
			if (parent.transform) mat4.multiply(matrix, parent.transform);
		}

		return matrix;
	};

	def.invoke_components = function (canvas, render_callback, callback) {
		var entity = this;

		async.forEachSeries(this.components, function (name, next) {
			var on_callback = entity['on_' + name];

			if (on_callback) {
				return on_callback.call(entity, finish);

			} else {
				finish();
			}

			function finish () {
				entity.sendAsync(name, [canvas, entity], function (error) {
					if (error) return next(error);

					if (name === 'render' && render_callback) {
						return render_callback(next);
					}

					next();
				});
			}
		}, callback);

		return this;
	};

	def.render = function (canvas, callback, tick, _until) {
		if (this.rendering) {
			if (callback) callback.call(this, null, frame, canvas);

			return this;
		}

		if (_until) {
			return this.render_until(canvas, callback, tick);
		}

		var shaders = this.shaders,
		    context = canvas.context,
		    camera = canvas.camera,
		    entity = this;

		shaders = Object.keys(shaders).map(function (shader_uid) {
			return shaders[shader_uid];
		});

		(tick || requestAnimFrame)(frame, this.element);

		function frame () {
			entity.rendering = true;

			entity.invoke_components(canvas, render_shaders, function (error) {
				delete entity.rendering;

				if (callback) {
					callback.call(entity, error, entity, canvas);
				}
			});
		}

		function render_shaders (finish_render_callback) {
			async.forEach(shaders, function (shader, next) {
				shader.render(context, camera, entity, next);
			}, finish_render_callback);
		}

		return this;
	};

	def.render_until = function (canvas, callback, tick) {
		var entity = this,
		    stop = false;

		function stopper () {
			stop = true;
		}

		this.render(canvas, function (error, frame) {
			if (!stop && !error) ((tick || requestAnimFrame)(function () {
				callback.apply(entity, arguments);

				frame();
			}));
		}, tick);

		return stopper;
	};
});


function idle_callback (callback) {
	if (callback) callback();
}


require('mrg')(module.exports, require('./Entity/*'));
