"use strict";

var app = module.parent.app;

app.all("/test/data/event/longLoadScript.php", function (req, res) {
	var sleep = req.request.sleep || 0;

	sleep *= 1000;

	setTimeout(function () {
		res.set("Content-type", "text/javascript");
		res.send(null);
	}, sleep);
});
//5
