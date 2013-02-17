"use strict";


var Frustum = require('./Frustum'),
    utils = require('./utils'),
    mat4 = window.mat4;


module.exports = require('clss').create('Camera', function (def) {
	def.init = function (options) {
		utils.

			set_options(options, this, {
				view: mat4.identity(),
				projection: mat4.create()
			}).

			defer_options(options, this, utils.hash_array([
				'orthographic',
				'perspective',
				'look_at'
			]));

		return this;
	};

	def.to_frustum = function () {
		var frustum = new Frustum({
			
		});

		// TODO:

		return frustum;
	};

	def.is_othographic = function () {
		return this.kind === 'orthographic';
	};

	def.is_perspective = function () {
		return this.kind === 'perspective';
	};

	def.orthographic = function (options) {
		this.kind = 'orthographic';

		utils.set_options(options, this, {
			near: 1,
			far: -1,

			left: -1,
			right: 1,

			bottom: -1,
			top: 1
		});

		mat4.ortho(
			this.left,
			this.right,

			this.bottom,
			this.top,

			this.near,
			this.far,

			this.projection
		);

		return this;
	};

	def.perspective = function (options) {
		this.kind = 'perspective';

		utils.set_options(options, this, {
			fovy: 60,
			aspect: 1,

			near: 1,
			far: -1
		});

		mat4.perspective(
			this.fovy,
			this.aspect,

			this.near,
			this.far,

			this.projection
		);

		return this;
	};

	def.update_aspect = function (aspect) {
		return this.perspective({aspect: aspect});
	};

	def.look_at = function (options) {
		options = options || {};

		utils.set_options(options, this, {
			up: [0, 1, 0],
			eye: [0, 0, 1],
			target: [0, 0, 0],
		});

		mat4.lookAt(
			this.eye,
			this.target,
			this.up,

			this.view
		);

		return this;
	};
});
