"use strict";

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);

	var sleep = req.query.sleep || 0;

	sleep *= 1000;

	setTimeout(function () {
		res.writeHead(200, {"Content-Type": "text/javascript"});
		res.end(null);
		done();
	}, sleep);
};
//5
