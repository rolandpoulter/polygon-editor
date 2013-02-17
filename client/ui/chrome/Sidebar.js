"use strict";


var Outliner = require('./sidebar/Outliner'),
    Inspector = require('./sidebar/Inspector');


var DefaultWidth = 200;


module.exports = require('mttr').clss('Sidebar', function (def) {
	def.init = function (app) {
		this.element = $('#sidebar');

		this.outliner = new Outliner(app);
		this.inspector = new Inspector(app);

		$(window).bind('resize', this.position.bind(this));

		return this.setWidth(DefaultWidth);
	};

	def.position = function () {
		var top = $('#toolbar').outerHeight();

		this.element.css({
			top: top,
			width: this.width,
			height: innerHeight - top
		});

		return this;
	};

	def.setWidth = function (width) {
		this.width = width;

		this.position();

		return this.emit('set width');
	};
});
