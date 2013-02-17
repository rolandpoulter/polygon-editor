"use strict";


var Edge = require('./Polygon');


module.exports = require('../Holder').clss('Face', function (def) {
	def.init = function (options) {
		return this.initHolder(options);
	};

	def.owner_name = 'mesh';

	def.object_class = Edge;
	def.object_name_plural = 'edges';

	def.add_edge = def.add_subject;
	def.remove_edge = def.remove_subject;
});
