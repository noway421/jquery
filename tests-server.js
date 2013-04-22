"use strict";

var express  = module.express = require("express");
var app      = module.app     = express();
var fs       = require("fs");

if (!fs.existsSync(__dirname + "/test/qunit/qunit/qunit.js")) {
	console.error("Qunit not found. Run `grunt` at first.");
	process.exit(1);
}

app.configure(function () {
	app.set("view engine", "ejs");
	app.engine(".html", require("ejs").__express);

	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	// app.use(express.logger());
	app.set("json spaces", 2);

	app.set("port", Number(process.env.PORT || 8000));
	app.set("host", null);

	app.use(express.bodyParser());

	app.use(function (req, res, next) {
		req.request = req.query;
		for (var i in req.body) {
			if (req.body.hasOwnProperty(i)) {
				if (typeof req.request[i] === "undefined") {
					req.request[i] = req.body[i];
				}
			}
		}
		next();
	});
});

function loadRoutes(path) {
	var list = fs.readdirSync(path), curPath, i;
	for (i = 0; i < list.length; i++) {
		curPath = path + "/" + list[i];
		if (fs.statSync(curPath).isDirectory()) {
			loadRoutes(curPath);
		} else if (/\.route\.js$/.exec(list[i])) {
			require(curPath);
		}
	}
}

loadRoutes(__dirname + "/test");


app.use(express.static(__dirname));
app.use(express.directory(__dirname));


app.listen(app.get("port"), app.get("host"));

console.log("Server started. Now you can go " +
	"to http://localhost:" + app.get("port") + "/test/ and run tests.");
