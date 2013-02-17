"use strict";


var Face = require('./Face');


module.exports = require('../Holder').clss('Polygon', function (def) {
	def.init = function (options) {
		return this.initHolder(options);
	};

	def.owner_name = 'mesh';

	def.object_class = Face;
	def.object_name_plural = 'faces';

	def.add_face = def.add_subject;
	def.remove_face = def.remove_subject;

	def.add_edge;
	def.remove_edge;

	def.add_vertex = function () {
		return this;
	};

	def.remove_vertex = function () {
		return this;
	};

	def.construct_edges_and_faces = function () {
		return this;
	};
});
