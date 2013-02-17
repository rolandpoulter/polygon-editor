"use strict";


var AABB = require('./AABB');


module.exports = require('clss').create('Frustum', function (def) {
	def.init = function (options) {
		return this;
	};

	def.to_aabb = function () {
		var aabb = new AABB();

		return aabb;
	};

	def.to_obb = function () {
		
	};

	def.intersects_obb = function () {
		
	};

	def.intersects_aabb = function () {
		
	};

	def.intersects_frustum = function () {
		
	};
});
