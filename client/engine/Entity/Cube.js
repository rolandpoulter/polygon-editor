"use strict";


var Mesh = require('../Mesh');


module.exports = require('../Entity').clss('Cube', function (def) {
	def.init = function (options) {
		options = options || {};

		options.mesh = new Mesh({
			rgba_colors: [ // hN
				0.5, 0.5, 0.5, 1 // h0
			],

			vertex_normals: [ // nN
				 0.0,  0.0, -1.0, // n0: back
				 0.0,  0.0,  1.0, // n1: front
				 0.0, -1.0,  0.0, // n2: bottom
				 0.0,  1.0,  0.0, // n3: top
				-1.0,  0.0,  0.0, // n4: left
				 1.0,  0.0,  0.0  // n5: right
			],

			vertex_positions: [ // pN
				-1.0, -1.0, -1.0, // p0
				-1.0, -1.0,  1.0, // p1
				-1.0,  1.0, -1.0, // p2
				 1.0, -1.0, -1.0, // p3
				 1.0,  1.0,  1.0, // p4
				 1.0,  1.0, -1.0, // p5
				 1.0, -1.0,  1.0, // p6
				-1.0,  1.0,  1.0  // p7
			],

			vertex_coordinates: [ // cN
				0.0, 0.0, // c0
				0.0, 1.0, // c1
				1.0, 1.0, // c2
				1.0, 0.0  // c3
			],

			vertices_map: [ // vN
				// front
				'p1', 'n1', 'c0', // v0
				'p6', 'n1', 'c3', // v1
				'p4', 'n1', 'c2', // v2
				'p7', 'n1', 'c1', // v3
				// back
				'p0', 'n0', 'c3', // v4
				'p2', 'n0', 'c2', // v5
				'p5', 'n0', 'c1', // v6
				'p3', 'n0', 'c0', // v7
				// top
				'p2', 'n3', 'c1', // v8
				'p7', 'n3', 'c0', // v9
				'p4', 'n3', 'c3', // v10
				'p5', 'n3', 'c2', // v11
				// bottom
				'p0', 'n2', 'c2', // v12
				'p3', 'n2', 'c1', // v13
				'p6', 'n2', 'c0', // v14
				'p1', 'n2', 'c3', // v15
				// right
				'p3', 'n5', 'c3', // v16
				'p5', 'n5', 'c2', // v17
				'p4', 'n5', 'c1', // v18
				'p6', 'n5', 'c0', // v19
				// left
				'p0', 'n4', 'c0', // v20
				'p1', 'n4', 'c3', // v21
				'p7', 'n4', 'c2', // v22
				'p2', 'n4', 'c1'  // v23
			],

			surface_polygons: [ // gN
				'#4', 'v00', 'v01', 'v02', 'v03', // p0
				'#4', 'v04', 'v05', 'v06', 'v07', // p1
				'#4', 'v08', 'v09', 'v10', 'v11', // p2
				'#4', 'v12', 'v13', 'v14', 'v15'  // p3
			],

			surface_materials: [ // mN
				{ // m0
					color: 'h0',
					opaque: true,
					texture: {src: '/assets/box.png'},
				}
			],

			surfaces_map: [ // sN
				'm0', 'g0', 'g1', 'g2', 'g3'
			]
		});

		return this.initEntity(options);
	};
});
