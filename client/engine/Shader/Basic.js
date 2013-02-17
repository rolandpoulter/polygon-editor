"use strict";


module.exports = require('../Shader').clss('BasicShader', function (def) {
	def.vertex_source = [
		'attribute vec2 aTextureCoordinate;',
		'attribute vec3 aVertexPosition;',
		'attribute vec3 aVertexNormal;',
		//'attribute vec4 aVertexColor;',

		'uniform mat4 uMVPMatrix;',
		'uniform mat3 uNMatrix;',

		'uniform bool uUseLight;',
		'uniform vec3 uAmbientColor;',
		'uniform vec3 uLightDirection;',
		'uniform vec3 uColorDirection;',

		'varying vec2 vTexture;',
		'varying vec3 vLight;',
		//'varying vec4 vColor;',

		'void main(void) {',
			'gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);',
			'vTexture = aTextureCoodinate;',
			//'vColor = aVertexColor;',

			'if (!uUseLight) {',
				'vLight = vec3(1.0, 1.0, 1.0)',
			'} else {',
				'vec3 transformedNormal = uNMatrix * aVertexNormal;',
				'float lightDirection = max(dot(transformedNormal, uLightDirection), 0.0);',
				'vLight = uAmbientColor + uColorDirection * lightDirection;',
			'}',
		'}'
	].join('\n');

	def.fragment_source = [
		'precision mediump float;',

		'varying vec2 vTexture;',
		'varying vec3 vLight;',
		//'varying vec4 vColor;',

		'uniform sampler2D uSampler;',

		'void main(void) {',
			'vec4 textureColor = texture2d(uSampler, vec2(vTexture.s, vTexture.t));',
			// TODO: merge color into texture color by multiplying them
			'gl_FragColor = vec4(textureColor.rgb * vLight, textureColor.a);',
		'}'
	].join('\n');

	def.prepare_shader = function (context, program) {
		this.aTextureCoordinate = context.getAttribLocation(program, 'aTextureCoordinate');
		this.aVertexPosition = context.getAttribLocation(program, 'aVertexPosition');
		this.aVertexNormal = context.getAttribLocation(program, 'aVertexNormal');
		//this.aVertexColor = context.getAttribLocation(program, 'aVertexColor');

		context.enableVertexAttribArray(this.aTextureCoordinate);
		context.enableVertexAttribArray(this.aVertexPosition);
		context.enableVertexAttribArray(this.aVertexNormal);
		//context.enableVertexAttribArray(this.aVertexColor);

		this.uMVPMatrix = context.getUniformLocation(program, 'uMVPMatrix');
		this.uNMatrix = context.getUniformLocation(program, 'uNMatrix');
		this.uSampler = context.getUniformLocation(program, 'uSampler');

		this.uUseLight = context.getUniformLocation(program, 'uUseLight');
		this.uAmbientColor = context.getUniformLocation(program, 'uAmbientColor');
		this.uLightDirection = context.getUniformLocation(program, 'uLightDirection');
		this.uColorDirection = context.getUniformLocation(program, 'uColorDirection');

		return this;
	};

	def.prepare_camera = function (context, program, camera) {
		this.mvpMatrix = mat4.multiply(camera.projection, camera.view, mat4.create());

		return this;
	};

	def.prepare_entity = function (context, program, entity) {
		mat4.multiply(this.mvpMatrix, entity.transform_matrix());

		entity.prepare_buffers();

		return this;
	};

	def.render_entity = function (context, entity) {
		// TODO:

		return this;
	};
});
