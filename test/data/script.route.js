"use strict";

var app = module.parent.app;

app.all("/test/data/script.php", function (req, res) {
	var header = req.request.header;

	if (header) {
		if (header === "ecma") {
			res.set("Content-type", "application/ecmascript");
		} else {
			res.set("Content-type", "text/javascript");
		}
	}
	res.send("ok( true, 'Script executed correctly.' );");
});
//5