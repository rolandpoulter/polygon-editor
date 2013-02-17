"use strict";


var Vertex = require('./Vertex');


module.exports = require('../Holder').clss('Edge', function (def) {
	def.init = function (options) {
		return this.initHolder(options);
	};

	def.owner_name = 'mesh';

	def.object_class = Vertex;
	def.object_name_plural = 'vertices';

	def.add_vertex = def.add_object;
	def.remove_vertex = def.remove_object;
});
