"use strict";

var fs  = require("fs");
var ejs = require("ejs");

module.exports = function (req, res, done) {
	fs.readFile(__dirname + "/text.view.ejs", { encoding: "utf8" }, function (err, data) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");
		res.end(ejs.render(data));
		done();
	});
};
//5
