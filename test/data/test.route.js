"use strict";

var fs  = require("fs");
var ejs = require("ejs");

module.exports = function (req, res, done) {
	var rand = Math.floor(Date.now()/1000) + "" + Math.floor(Math.random() * 32767);
	fs.readFile(__dirname + "/test.view.ejs", { encoding: "utf8" }, function (err, data) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");
		res.end(ejs.render(data, { rand: rand }));
		done();
	});
};
//5