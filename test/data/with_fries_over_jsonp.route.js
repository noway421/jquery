"use strict";

var app = module.parent.app;
var fs = require("fs");

var withFriesContent = JSON.stringify(
	fs.readFileSync(
			__dirname + "/with_fries.xml",
			{ encoding: "utf8" }
		)
	);

app.all("/test/data/with_fries_over_jsonp.php", function (req, res) {
	var callback = req.request.callback;
	res.send(callback + "(" + withFriesContent + ")");
});
//5
