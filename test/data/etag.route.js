"use strict";

var app = module.parent.app;
var crypto = require("crypto");

app.all("/test/data/etag.php", function (req, res) {
	var
		ts = req.request.ts,
		etag = crypto.createHash("md5").update(ts, "utf8").digest("hex"),
		ifNoneMatch = req.get("If-None-Match") || false;

	if (ifNoneMatch === etag) {
		res.status(304);
		res.send(null);
		return;
	}

	res.set("Etag", etag);

	if (ifNoneMatch) {
		res.send("OK:" + etag);
	} else {
		res.send("FAIL");
	}
});
//5