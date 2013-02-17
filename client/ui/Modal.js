"use strict";


module.exports = require('clss').create('Modal', function (def) {
	def.init = function (app) {
		this.element = $('#modal');

		return this;
	};
});
