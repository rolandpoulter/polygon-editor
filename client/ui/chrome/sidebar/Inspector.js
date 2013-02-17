"use strict";


module.exports = require('clss').create('Inspector', function (def) {
	def.init = function (app) {
		this.element = $('#inspector');

		return this;
	};
});
