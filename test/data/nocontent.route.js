"use strict";

var app = module.parent.app;

app.all("/test/data/nocontent.php", function (req, res) {
	res.status(204);
	res.send(null);
});
//5