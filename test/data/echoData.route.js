"use strict";

var connect = require("connect");
var qs = require("qs");

module.exports = function (req, res, done) {
	connect.bodyParser()(req, res, function () {
		var post = req.body;

		res.setHeader("Content-Type", "text/plain");
		res.statusCode = 200;
		res.end(r(qs.stringify(post)));
		done();
	});
};
function r (str) {
	return str
		.replace(/\[/g, "%5B")
		.replace(/\]/g, "%5D")
		.replace(/\=\&/g, "")
		.replace(/\=$/g, "");
}
//4
