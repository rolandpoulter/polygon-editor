"use strict";


var merge = require('mrg'),
    Class = require('clss'),

    utils = require('./utils'),

    AABB = require('./AABB'),

    vec3 = window.vec3,
    mat4 = window.mat4;


var OctreeNode = Class.create('OctreeNode', function (def) {
	def.init = function (options) {
		options = options || {};

		utils.

			set_options(options, this, {
				data: {},
				
			});

		return this.set_parent(options.parent);
	};

	def.merge_data = function () {
		return this;
	};

	def.set_parent = function () {
		return this;
	};

	def.create_parent = function () {
		return this;
	};

	def.remove_children = function () {
		return this;
	};

	def.create_children = function () {
		return this;
	};
});


module.exports = Class.create('Octree', function (def) {
	var Node = this.Node || (this.Node = OctreeNode);

	def.init = function (options) {
		utils.

			set_options(options, this, {
				node: new Node(),
				aabb: new AABB()
			});

		return this;
	};

	def.insert_entity = function (entity) {
		return this;
	};

	def.remove_entity = function (entity) {
		return this;
	};

	def.get_intersects = function (entity) {
		var entities = [];
		return entities;
	};

	def.get_entities = function (camera) {
		var entities = [];
		return entities;
	};

	def.get_vector = function (vector, equality) {
		// TODO:
	};

	def.set_point_data = function () {
		return this;
	};

	def.set_aabb_data = function () {
		return this;
	};

	def.set_obb_data = function () {
		
	};

	def.set_frustum_data = function () {
		
	};

	def.get_point_node = function () {
		var list = [];

		return list;
	};

	def.get_aabb_nodes = function (aabb) {
		var list = [];

		return list;
	};

	def.get_obb_nodes = function () {
		
	};

	def.get_frustum_nodes = function () {
		
	};
});
