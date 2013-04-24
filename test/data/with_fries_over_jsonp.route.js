"use strict";

var fs = require("fs");
var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);
	var callback = req.query.callback;
	fs.readFile(
		__dirname + "/with_fries.xml",
		{ encoding: "utf8" },
		function (err, data) {
			res.statusCode = 200;
			res.end(callback + "(" + JSON.stringify(data) + ")");
			done();
		}
	);
};
//5
