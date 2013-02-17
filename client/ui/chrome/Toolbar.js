"use strict";


module.exports = require('clss').create('Toolbar', function (def) {
	def.init = function (app) {
		this.element = $('#toolbar');

		return this;
	};
});
