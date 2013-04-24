"use strict";

var connect = require("connect");
var querystring = require("querystring");
var url = require("url");
var fs  = require("fs");
var ejs = require("ejs");

module.exports = function (req, res, done) {
	connect.bodyParser()(req, res, function () {
		req.query = querystring.parse(url.parse(req.url).query);

		fs.readFile(__dirname + "/params_html.view.ejs", { encoding: "utf8" }, function (err, data) {
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");
			res.end(ejs.render(data, { post: req.body, get: req.query }));
			done();
		});
	});
};
//5
