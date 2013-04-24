"use strict";

var connect  = require("connect");
var path     = require("path");
var url      = require("url");

var send  = require("send");
var utils = connect.utils;
var parse = utils.parseUrl;


var SCRIPT_EXT = ".php";
var ROUTE_EXT = ".route.js";
var PORT = 8000;


var app = connect();

app.use(function (req, res, next) { // routes
	req.path = url.parse(req.url).pathname;
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
		console.log("Eror from route", routePath, ": ", e);
	}
});

app.use(function (req, res, next) { // copypast from connectjs
	var path = parse(req).pathname, pause = utils.pause(req);

	function resume() {
		next();
		pause.resume();
	}

	function directory() {
		var pathname = url.parse(req.originalUrl).pathname;
		res.statusCode = 301;
		res.setHeader("Location", pathname + "/");
		res.end("Redirecting to " + utils.escape(pathname) + "/");
	}

	function error(err) {
		if (404 === err.status) { return resume(); }
		next(err);
	}

	send(req, path)
		.maxage(0)
		.root(__dirname)
		.index("index.html")
		.hidden(false)
		.on("error", error)
		.on("directory", directory)
		.pipe(res);

});

app.use(connect.directory(__dirname));
app.listen(PORT);


console.log("Routes serving server starts on port " + PORT);