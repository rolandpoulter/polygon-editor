"use strict";


module.exports = UID;

UID.counter = 0;

UID.parse = parse;


function UID (time, count) {
	if (!is_integer(time)) time = Date.now();
	if (!is_integer(count)) count = UID.counter++;

	return time.toString(36) + '-' + count.toString(36);
};


function parse (id) {
	id = id.split('-');

	var count = id.pop(),
	    time = id.pop(),
	    tag = id.pop(),
	    obj;

	obj = {
		count: parseInt(count, 36),
		time: parseInt(time, 36),
	};

	if (tag) obj.tag = tag;

	return obj;
}


function is_integer (num) {
	return isFinite(num) && (~~num) === num;
}


function random_0_to_36 () {
	return Math.round(Math.random() * 36)
}


function random_char_36 () {
	return random_0_to_36().toString(36);
}
