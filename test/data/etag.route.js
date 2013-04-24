"use strict";

var crypto = require("crypto");

var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	req.query = querystring.parse(url.parse(req.url).query);

	var
		ts = req.query.ts,
		etag = crypto.createHash("md5").update(ts, "utf8").digest("hex"),
		ifNoneMatch = req.headers["if-none-match"] || false;

	if (ifNoneMatch === etag) {
		res.statusCode = 304;
		res.end(null);
		done();
		return;
	}

	res.setHeader("Etag", etag);
	res.statusCode = 200;

	if (ifNoneMatch) {
		res.end("OK:" + etag);
	} else {
		res.end("FAIL");
	}
	done();
};
//5
