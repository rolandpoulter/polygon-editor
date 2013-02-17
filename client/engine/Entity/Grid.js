"use strict";


module.exports = require('../Entity').clss('Grid', function (def) {
	def.init = function (options) {
		return this.initEntity(options);
	};
});
