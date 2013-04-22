"use strict";

var app = module.parent.app;

app.all("/test/data/evalScript.php", function (req, res) {
	var m = req.route.method.toUpperCase();
	res.send("ok('" + m + "' === 'GET', 'request method is "  + m + "');");
});
//5
