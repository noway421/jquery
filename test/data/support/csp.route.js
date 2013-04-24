"use strict";

var ejs = require("ejs");
var fs = require("fs");

module.exports = function (req, res, done) {
	// Support: Firefox
	res.setHeader("X-Content-Security-Policy", "default-src 'self'");

	// Support: Webkit, Safari 5
	// http://stackoverflow.com/questions/13663302/why-does-my-content-security-policy-work-everywhere-but-safari
	res.setHeader("X-WebKit-CSP", "script-src " + req.host + " 'self'");

	res.setHeader("Content-Security-Policy", "default-src 'self'");

	res.statusCode = 200;

	fs.readFile(__dirname + "/csp.view.ejs", { encoding: "utf8" }, function (err, data) {
		res.end(ejs.render(data));
		done();
	});
};
//5
