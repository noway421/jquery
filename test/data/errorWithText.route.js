"use strict";

var app = module.parent.app;

app.all("/test/data/errorWithText.php", function (req, res) {
	res.status(400);
	res.send("plain text message");
});
//5
