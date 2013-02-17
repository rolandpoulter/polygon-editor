"use strict";


var Enumerable = require('../../helpers/Enumerable'),

    Hash = require('./Hash');


module.exports = require('clss').create('Graph', function (def) {
	def.init = function () {
		this.inputs = new Hash();
		this.outputs = new Hash();

		return this;
	};

	def.addInputs = Enumerable.metaMethod('addInput');
	def.addOutputs = Enumerable.metaMethod('addOutput');

	def.add =
	def.inputOutputs = Enumerable.metaMethod('inputOutput');
	def.outputInputs = Enumerable.metaMethod('outputInput');

	def.inputOutput = function (output) {
		this.addInput(output);
		output.addOuput(this);

		return this;
	};

	def.outputInput = function (input) {
		this.addOuput(input);
		input.addInput(this);

		return this;
	}

	def.addInput = function (input) {
		if (this.inputs.indexOf(input) === -1) {
			this.inputs.push(input);
		}

		return this;
	};

	def.addOutput = function (output) {
		if (this.outputs.indexOf(output) === -1) {
			this.outputs.push(output);
		}

		return this;
	};

	def.removeInput = function (input) {
		var index = this.children.indexOf(input);

		if (index !== -1) this.children.splice(index, 1);

		return this;
	};

	def.removeOutput = function (output) {
		return this;
	};

	// TODO: indexOf

	def.forEachInput = function (iterator, that) {
		this.children.forEach(iterator, that || this);

		return this;
	};

	def.forEachOutput = function (iterator, that) {
		this.parents.forEach(iterator, that || this);

		return this;
	};
});

//require('mrg')(module.exports, require('./group/*'));
