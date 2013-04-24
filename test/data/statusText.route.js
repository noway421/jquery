"use strict";

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);
	var status = req.query.status, text = req.query.text;

	res.writeHead(status, text);
	res.end(null);
	done();
};
//5
