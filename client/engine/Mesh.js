"use strict";


var merge = require('mrg');


module.exports = require('./Holder').clss('Mesh', function (def) {
	// TODO: need to_aabb
	// TODO: need event handlers for clicking on stuff

	var Mesh = this;

	merge(Mesh, require('./Mesh/*'));

	def.holder_name = 'entity';

	def.object_class = Mesh.Surface;
	def.object_name_plural = 'surfaces';

	def.init = function (options) {
		if (typeof options === 'string') {
			options = JSON.parse(options);
		}

		if (!options.surfaces) {
			this.construct_from_options_maps(options);
		}

		// TODO: create local octree

		return this.
			initHolder(options).
			set_object_list('materials').
			set_object_list('polygons').
			set_object_list('vertices').
			set_object_list('faces').
			set_object_list('edges');
	};

	def.construct_from_options_maps = function (options) {
		options = options || {};

		var mesh = this;

		var rgba_colors = options.rgba_colors || [], // hN
		    vertex_normals = options.vertex_normals || [], // nN
		    vertex_positions = options.vertex_positions || [], // pN
		    vertex_coordinates = options.vertex_coordinates || [], // cN
		    surface_materials = options.surface_materials || [], // mN
		    surface_polygons = options.surface_polygons || [], // gN
		    vertices_map = options.vertices_map || [], // vN
		    surfaces_map = options.surfaces_map || [];

		var materials,
		    surfaces = [],
		    polygons = [],
		    vertices = [],
		    faces = [],
		    edges = [];

		var vertex,
		    polygon,
		    surface;

		vertices_map.forEach(function (tag) {
			var key = tag.charAt(0),
			    num = parseInt(tag.substr(1), 10);

			if (key === 'p') { // position
				push_vertex();

				vertex = new Mesh.Vertex({
					mesh: mesh,
					poisition: vertex_positions[num]
				});

			} else if (key === 'n') { // normal
				vertex.normal = vertex_normals[num];

			} else if (key === 'c') { // coordinate
				vertex.coordinate = vertex_coordinates[num];

			} else if (key === 'h') { // color
				vertex.color = rgba_colors[num];
			}
		});

		push_vertex();

		function push_vertex () {
			if (vertex) {
				vertices.push(vertex);
			}
		}

		materials = surface_materials.map(function (options) {
			if (typeof options.color === 'string' && options.color.charAt(0) === 'h') {
				options.color = rgba_colors[parseInt(options.color.substr(1), 10)];
			}

			return new Mesh.Material(options);
		});

		surface_polygons.forEach(function (tag) {
			var key = tag.charAt(0),
			    num = parseInt(tag.substr(1));

			if (key === '#') {
				push_polygon();

				polygon = new Mesh.Polygon({
					mesh: mesh
				});

			} else if (key === 'v') {
				polygon.add_vertex(vertices[num]);
			}
		});

		function push_polygon () {
			if (polygon) {
				polygons.push(polygon.construct_edges_and_faces({
					edges: edges,
					faces: faces
				}));
			}
		}

		surfaces_map.forEach(function (tag) {
			var key = tag.charAt(0),
			    num = parseInt(tag.substr(1), 10);

			if (key === 'm') {
				push_surface();

				surface = new Mesh.Surface({
					mesh: mesh,
					material: materials[num]
				});

			} else if (key === 'g') {
				surface.add_polygon(polygons[num]);
			}
		});

		function push_surface () {
			if (surface) {
				surfaces.push(surface);
			}
		};

		options.materials = materials;
		options.surfaces = surfaces;
		options.polygons = polygons;
		options.vertices = vertices;
		options.faces = faces;
		options.edges = edges;

		return this;
	};

	[
		['Material', 'materials'],
		['Surface', 'surfaces'],
		['Polygon', 'polygons'],
		['Vertex', 'vertices'],
		['Face', 'faces'],
		['Edge', 'edges']

	].forEach(function (label) {
		var lower = label[0].toLowerCase();

		def['add_' + lower] = function (object) {
			return this.add_object(object, Mesh[label[0]], label[1]);
		};

		def['remove_' + lower] = function (object) {
			return this.remove_object(object, Mesh[label[0]], label[1]);
		};
	});

	def.to_obb = function () {
		
	};

	def.to_aabb = function () {
		
	};

	def.vertex_buffer = function (context) {
		// TODO:
		return this;
	};

	def.face_buffer = function (context) {
		// TODO:
		return this;
	};

	def.edge_buffer = function (context) {
		// TODO:
		return this;
	};
});



/*
cubeVertexPositionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
cubeVertexPositionBuffer.itemSize = 3;
cubeVertexPositionBuffer.numItems = 24;

cubeVertexNormalBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
var vertexNormals = [
    // Front face
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,

    // Back face
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,

    // Top face
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,

    // Bottom face
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

    // Right face
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

    // Left face
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
cubeVertexNormalBuffer.itemSize = 3;
cubeVertexNormalBuffer.numItems = 24;

cubeVertexTextureCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
var textureCoords = [
    // Front face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,

    // Back face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Top face
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,

    // Bottom face
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    // Right face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Left face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
cubeVertexTextureCoordBuffer.itemSize = 2;
cubeVertexTextureCoordBuffer.numItems = 24;

cubeVertexIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
var cubeVertexIndices = [
    0, 1, 2,      0, 2, 3,    // Front face
    4, 5, 6,      4, 6, 7,    // Back face
    8, 9, 10,     8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15, // Bottom face
    16, 17, 18,   16, 18, 19, // Right face
    20, 21, 22,   20, 22, 23  // Left face
];
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
cubeVertexIndexBuffer.itemSize = 1;
cubeVertexIndexBuffer.numItems = 36;
*/
