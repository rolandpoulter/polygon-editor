"use strict";


var Sidebar = require('./chrome/Sidebar'),
    Toolbar = require('./chrome/Toolbar');


module.exports = require('clss').create('Chrome', function (def) {
	def.init = function (app) {
		this.sidebar = new Sidebar(app);
		this.toolbar = new Toolbar(app);

		return this;
	};
});
