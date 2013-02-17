"use strict";


var uid = require('./uid'),
    utils = require('./utils');


module.exports = require('clss').create('Shader', function (def) {
	def.init = function (options) {
		utils.set_options(options, this, {
			uid: uid,

			vertex_source: null,
			fragment_source: null
		});

		return this;
	};

	def.extract_source = function (source) {
		if (typeof source === 'function') {
			return source.call(this);
		}

		return source;
	};

	def.program = function (context) {
		if (!context.cache[this.uid]) {
			context.cache[this.uid] = {};
		}

		if (context.cache[this.uid].program) {
			return context.cache[this.uid].program;
		}

		// TODO: do I need to compile seperate programs for each canvas context or only once?

		var program = compile_program(
			this.extract_source(this.vertex_source),
			this.extract_source(this.fragment_source)
		);

		return context.cache[this.uuid].program = program;

		function compile_program (vertex_source, fragment_source) {
			var program = context.createProgram(),

			    vertex_shader = compile_shader(vertex_source, context.VERTEX_SHADER),
			    fragment_shader = compile_shader(fragment_source, context.FRAGMENT_SHADER);

			context.attachShader(program, vertex_shader);
			context.attachShader(program, fragment_shader);

			context.linkProgram(program);

			if (!context.getProgramParameter(program, context.LINK_STATUS)) {
				throw context.getProgramInfoLog(program);
			}

			return program;
		}

		function compile_shader (source, type) {
			var shader = context.createShader(type);

			context.shaderSource(shader, source);
			context.compileShader(shader);

			if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
				throw context.getShaderInfoLog(shader);
			}

			return shader;
		}
	};

	def.render = function (context, camera, entity, callback) {
		var program = this.program(context);

		context.useProgram(program);

		this.
			prepare_shader (context, program).
			prepare_camera (context, program, camera).
			prepare_entity (context, program, entity).
			render_entity  (context, entity);

		if (callback) callback.call(this);

		return this;
	};

	def.prepare_shader = function (context, program) {
		throw new Error('prepare_shader not implemented.');
	};

	def.prepare_camera = function (context, program, camera) {
		throw new Error('prepare_camera not implemented.');
	};

	def.prepare_entity = function (context, program, enitty) {
		throw new Error('prepare_entity not implemented.');
	};

	def.render_entity = function (context, entity) {
		throw new Error('render_entity not implemented.');
	};
});


require('mrg')(module.exports, require('./Shader/*'));
