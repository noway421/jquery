"use strict";

module.exports = function (req, res, done) {
	res.setHeader("Content-Type", "text/plain");
	res.statusCode = 400;
	res.end("plain text message");
	done();
};
//5
