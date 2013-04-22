"use strict";

var app = module.parent.app;

app.all("/test/data/headers.php", function (req, res) {
	res.set("Sample-Header", "Hello World");
	res.set("Empty-Header", "");
	res.set("Sample-Header2", "Hello World 2");

	var keys = req.query.keys.split("_"), buf = "", i;
	for (i = 0; i < keys.length; i++) {
		buf += keys[i] + ": " + (req.get(keys[i]) || "") + "\n";
	}

	res.send(buf);
});
//5