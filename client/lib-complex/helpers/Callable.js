"use strict";


exports.safeApply = function (func, args, that) {
	if (typeof func === 'function') return func.apply(args, that);
};
