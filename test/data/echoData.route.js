"use strict";

var app = module.parent.app;
var qs = require("qs");

app.all("/test/data/echoData.php", function (req, res) {
	var post = req.body;

	res.send(r(qs.stringify(post)));
});

function r (str) {
	return str
		.replace(/\[/g, "%5B")
		.replace(/\]/g, "%5D")
		.replace(/=\&/g, "&")
		.replace(/=$/g, "");
}
//4
