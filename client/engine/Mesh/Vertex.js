"use strict";


var uid = require('../uid');


module.exports = require('clss').create('Vertex', function (def) {
	def.init = function (options) {
		options = options || {};

		this.uid = options.uid || this.uid || uid();
		this.mesh = options.mesh || this.mesh;

		this.position = options.position || [0, 0, 0];

		return this;
	};
});
