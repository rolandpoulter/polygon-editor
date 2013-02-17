"use strict";


var Polygon = require('./Polygon');


module.exports = require('../Holder').clss('Surface', function (def) {
	def.init = function (options) {
		return this.initHolder(options);
	};

	def.owner_name = 'mesh';

	def.object_class = Polygon;
	def.object_name_plural = 'polygons';

	def.add_polygon = def.add_subject;
	def.remove_polygon = def.remove_subject;
});
