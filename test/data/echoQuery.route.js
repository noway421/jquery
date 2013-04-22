"use strict";

var app = module.parent.app;
var qs = require("qs");

app.all("/test/data/echoQuery.php", function (req, res) {
	var get = req.query;

	res.send(r(qs.stringify(get)));
});

function r (str) {
	return str
		.replace(/\[/g, "%5B")
		.replace(/\]/g, "%5D")
		.replace(/=\&/g, "&")
		.replace(/=$/g, "");
}
//4
