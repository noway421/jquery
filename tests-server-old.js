"use strict";

var express  = module.express = require("express");
var app      = module.app     = express();
var fs       = require("fs");
var path     = require("path");

var SCRIPT_EXT = ".php";
var ROUTE_EXT = ".route.js";

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

	app.use(function (req, res, next) { // routes
		if (req.path.indexOf(SCRIPT_EXT) === -1) { next(); return; }

		// some crazy apache-like routing
		var
			extIndex = req.path.indexOf(SCRIPT_EXT) + SCRIPT_EXT.length,
			scriptPath = req.path.substring(0, extIndex),
			routePath = scriptPath.replace(SCRIPT_EXT, ROUTE_EXT),
			routeDir = path.join(__dirname, routePath),
			route;

		try {
			route = require(routeDir);
			route(req, res, function () {
				// unloading module
				var name = require.resolve(routeDir), chname, i;
				if (!require.cache[name]) { return; }
				for (i in require.cache[name].children) {
					if (require.cache[name].children.hasOwnProperty(i)) {
						chname = require.resolve(require.cache[name].children[i].id);
						delete require.cache[chname];
					}
				}
				delete require.cache[name];
			});
		} catch (e) {
			if (e.code === "MODULE_NOT_FOUND") {
				next();
				return;
			}
			throw e;
		}
	});

	app.use(function (req, res, next) { // static files
		var fileDir = path.join(__dirname, req.path);
		fs.exists(fileDir, function (exists) {
			if (!exists) {
				next();
				return;
			}
			fs.stat(fileDir, function (err, stats) {
				if (!stats.isFile()) {
					next();
					return;
				}
				res.sendfile(path.join(__dirname, req.path));
			});
		});
	});

	app.use(express.directory(__dirname));
});

app.listen(app.get("port"), app.get("host"));

console.log("Routes serving server starts on port " + app.get("port"));