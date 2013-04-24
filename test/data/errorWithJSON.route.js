"use strict";

module.exports = function (req, res, done) {
	res.setHeader("Content-Type", "application/json");
	res.statusCode = 400;
	res.end("{ \"code\": 40, \"message\": \"Bad Request\" }");
	done();
};
//5
