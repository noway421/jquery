"use strict";

module.exports = function (req, res, done) {
	var m = req.method.toUpperCase();
	res.setHeader("Content-Type", "text/plain");
	res.statusCode = 200;
	res.end("ok('" + m + "' === 'GET', 'request method is "  + m + "');");
	done();
};
//5
