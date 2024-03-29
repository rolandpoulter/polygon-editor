"use strict";


var uid = require('../uid');

module.exports = require('clss').create('Texture', function (def) {
	def.init = function (options) {
		options = options || {};

		this.uid = options.uid || this.uid || uid();

		return this;
	};

	def.prepare = function (context) {
		//if (!)

		context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

		context.bindTexture(context.TEXTURE_2D, this._texture);

		return this;
	};
});/*
 function handleLoadedTexture(texture) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }


    var crateTexture;

    function initTexture() {
        crateTexture = gl.createTexture();
        crateTexture.image = new Image();
        crateTexture.image.onload = function () {
            handleLoadedTexture(crateTexture)
        }

        crateTexture.image.src = "crate.gif";
    }
    */
 