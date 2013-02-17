"use strict";


var Engine = require('./engine'),
    History = require('./History'),

    Chrome = require('./ui/Chrome'),
    Viewport = require('./ui/Viewport');


module.exports = require('mttr').clss('App', function (def) {
	def.init = function () {
		this.socket = window.io.connect(window.location);

		this.engine = new Engine();
		this.history = new History();

		this.chrome = new Chrome(this);
		this.viewport = new Viewport(this);

		return this;
	};
});
