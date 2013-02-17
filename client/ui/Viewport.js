"use strict";


var viewport_input = require('./viewport/input'),

    Shader = require('../engine/Shader'),

    //Grid = require('../engine/Entity/Grid'),
    Cube = require('../engine/Entity/Cube');


module.exports = require('clss').create('Viewport', function (def) {
	def.init = function (app) {
		this.engine = app.engine;

		this.element = $('#viewport');

		this.default_shaders = [new Shader.Basic()];

		//this.grid = new Grid({shaders: this.default_shaders});
		this.cube = new Cube({shaders: this.default_shaders});

		this.canvas = this.engine.create_canvas({
			parent: this.element
		});

		this.canvas.camera.perspective(50, 16/9, 0.01, 1000);

		this.engine.
			install_shader(this.shader).
			//add_entity(this.grid).
			add_entity(this.cube);

		var update_position = this.position.bind(this);

		$(window).bind('resize', update_position);

		app.chrome.sidebar.on('set width', update_position);

		viewport_input(this.element, this.canvas);

		return this.position();
	};

	def.position = function () {
		var top = $('#toolbar').outerHeight(),
		    right = $('#sidebar').outerWidth(),
		    that = this;

		this.width = innerWidth - right;
		this.height = innerHeight - top;

		this.element.css({
			top: top,
			width: this.width,
			height: this.height
		});

		this.canvas.set_size(that.width, that.height);

		return this.render();
	};

	def.render = function (callback, tick, _until) {
		var canvases = this.engine.canvases;
		
		Object.keys(canvases).forEach(function (canvas_id) {
			canvases[canvas_id].clear();
		});

		var stopper = this.engine.render(callback, tick, _until);

		if (_until) return stopper;

		return this;
	};

	def.render_until = function (callback, tick) {
		var stopper = this.canvas.render_until(callback, tick);

		if (callback) return this;

		return stopper;
	};
});
