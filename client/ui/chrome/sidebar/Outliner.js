"use strict";


module.exports = require('clss').create('Outliner', function (def) {
	def.init = function (app) {
		this.element = $('#outliner');

		return this;
	};
});
