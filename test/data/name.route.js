"use strict";

var connect = require("connect");
var utils = connect.utils;
var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	connect.bodyParser()(req, res, function () {
		req.query = querystring.parse(url.parse(req.url).query);
		req.request = utils.merge(req.query, req.body);
		var wait = req.query.wait || 0;

		wait *= 1000;

		setTimeout(function () {
			var xml = req.query.xml, name = req.query.name, result;
			res.statusCode = 200;
			if (xml) {
				res.setHeader("Content-Type", "text/xml");
				result = (xml === "5-2") ? "3" : "?";

				res.end("<math><calculation>" + xml + "</calculation><result>" + result + "</result></math>");
				done();
				return;
			}
			if (name === "foo") {
				res.end("bar");
				done();
				return;
			} else if (name === "peter") {
				res.end("pan");
				done();
				return;
			}

			res.end("ERROR <script type=\"text/javascript\">ok( true, 'name.php executed' );</script>");
			done();
		}, wait);
	});
};

//4
